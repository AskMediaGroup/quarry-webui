/*global console, App, Em, $, Blob */
/*jslint browser: true*/
App.ExportController = Em.ArrayController.extend({
    content: [],
    needs: [ 'serp'],
    searchTermsBinding: 'controllers.serp.searchTerms',
    totalBinding: 'controllers.serp.total',
    SEARCH_ITER_LIMIT: 250,

    actions: {
        edit: function () {
            this.set('ready', false);
        },
        cancel: function () {
            this.transitionToRoute('serp.index');
        },
        beginDataFetch: function () {
            this.set('isLoading', true);
        }
    },

    setCsvOptions: function () {
        this.set('csvOptions', App.CsvOptions.create({
            defaultValue: this.get('selectAllAttributes')
        }));
    }.observes('selectAllAttributes'),

    percentComplete: function () {
        return this.get('content').length > 0 ?
                Math.floor((this.get('content').length / this.get('total')) * 100) :
                0;
    }.property('total', 'content.@each'),

    getIpsString: function (ipsArray) {
        var ipsStringArray, i, len, ipString;
        ipsStringArray = [];
        for (i = 0, len = ipsArray.length; i < len; i += 1) {
            // Include network info if we have it
            if (ipsArray[i].network) {
                ipString = 'ip: ' + ipsArray[i].ip + ' / network ID: ' +
                    ipsArray[i].network.network_id;
            } else {
                ipString = 'ip: ' + ipsArray[i].ip;
            }
            // Separate each IP/network pair with a semicolon
            ipsStringArray.push(ipString, '; ');
        }
        // Remove the trailing semicolon
        ipsStringArray.pop();
        return ipsStringArray.join('');
    },

    getData: function () {
        if (this.get('isLoading')) {
            var searchTerms, that = this;
            if (this.get('incomplete')) {
                searchTerms = App.SearchAsset.create(
                    this.get('searchTerms')
                ).setProperties({
                    offset: this.get('offset'),
                    limit: this.get('SEARCH_ITER_LIMIT')
                });
                App.Serp.find(searchTerms).then(
                    function (response) {
                        that.incrementProperty('offset', response.assets.length);
                        that.get('content').pushObjects(response.assets);
                        if (response.assets.length < that.get('SEARCH_ITER_LIMIT')) {
                            that.set('incomplete', false);
                        }
                    }
                );
            } else if (!this.get('downloadLink')) {
                this.makeCsvData();
            }
        }
    }.observes('isLoading', 'offset', 'incomplete'),

    makeCsvData: function () {
        var csvOptions, selectedColumns, option, csvArray, csvAttributes,
            results, i, that, numResults, ipString, j, numColumns, csvString,
            blob, windowUrl;
        csvOptions = this.get('csvOptions');
        selectedColumns = [];
        // Iterate through the entire csvOptions object
        for (option in csvOptions) {
            // Make sure we don't include inherited properties
            if (csvOptions.hasOwnProperty(option)) {
                // And we don't want to include the Object's
                // helper 'defaultValue' property
                if (option !== 'defaultValue') {
                    // If the user selected the property's checkbox...
                    if (csvOptions[option]) {
                        // ... then we include it
                        selectedColumns.push(option);
                    }
                }
            }
        }
        csvArray = [];
        csvAttributes = [];
        // This is how we build the header row at the top
        // And a helper string to present to the user
        selectedColumns.forEach(function (item) {
            csvArray.push(item, ',');
            csvAttributes.push(item, ', ');
        });
        // We'll present a string to the user as a representation
        // of the chosen attributes to include
        csvAttributes.pop();
        this.set('csvAttributes', csvAttributes.join(''));
        // Remove the trailing comma
        csvArray.pop();
        // And add a line feed
        csvArray.push('\n');
        results = this.get('content');
        for (i = 0, numResults = results.length; i < numResults; i += 1) {
            that = this;
            for (j = 0, numColumns = selectedColumns.length; j < numColumns;
                    j += 1) {
                if (selectedColumns[j] === 'ips') {
                    if (results[i][selectedColumns[j]].length > 0) {
                        ipString =
                            that.getIpsString(results[i][selectedColumns[j]]);
                    } else {
                        ipString = 'No IP address';
                    }
                    csvArray.push(ipString, ',');
                } else {
                    // The following foo replaces null values with ''
                    // and all instances of '\n' or '\r\n' with ''
                    csvArray.push(
                        results[i][selectedColumns[j]] === null ?
                                '' :
                                String(
                                    results[i][selectedColumns[j]]
                                ).replace(/\r?\n/g, ''),
                        ','
                    );
                }
            }
            // Remove the trailing comma
            csvArray.pop();
            csvArray.push('\n');
        }
        // Remove the trailing line feed
        csvArray.pop();
        // Now it's all starting to come together
        csvString = csvArray.join('');
        this.set('csvString', csvString);
        blob = new Blob([csvString], {type: 'text/csv'});
        windowUrl = window.URL || window.webkitURL;
        this.setProperties({
            downloadLink: windowUrl.createObjectURL(blob),
            ready: true,
            isLoading: false
        });
    }
});