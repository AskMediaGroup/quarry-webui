/*global Handlebars, Em, $ */
Em.Handlebars.registerBoundHelper('searchString',
    function (searchTerms) {
        var key, strArr = [], asset = searchTerms.get('asset');
        for (key in asset) {
            // Strip out inherited attributes
            if (asset.hasOwnProperty(key)) {
                // Build the string array
                strArr.push(key, ' = "', asset[key], '"', ' && ');
            }
        }
        if (searchTerms.get('ips').length > 0) {
            searchTerms.get('ips').forEach(function (item, index, enumerable) {
                strArr.push('IP = ', item.get('ip'), ' && ');
            });
        }
        // Get rid of the trailing ' && '
        strArr.pop();
        return new Handlebars.SafeString(strArr.join(''));
    });