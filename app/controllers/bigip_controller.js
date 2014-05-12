/*global console, App, Quarry, Em, $ */
App.BigIpController = Em.ObjectController.extend({
    content: {},
    needs: ['vips'],

    actions: {
        search: function () {
            var that = this;
            this.setProperties({
                isSearching: true,
                failedSearch: false
            });
            if (this.get('findToken').match(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/)) {
                App.BigIp.findByIp(this.get('dc'), this.get('findToken')).then(
                    that.searchSuccessCallback(),
                    that.searchFailureCallback()
                );
            } else {
                App.BigIp.findByName(this.get('dc'), this.get('findToken')).then(
                    that.searchSuccessCallback(),
                    that.searchFailureCallback()
                );
            }
        },
        searchDcs: function () {
            var that = this;
            this.setProperties({
                isSearching: true,
                dcSearch: true,
                failedSearch: false
            });
            this.get('controllers.vips').set('dc', this.get('dc'));
            App.BigIp.vips(this.get('dc')).then(
                function (vips) {
                    that.setProperties({
                        isSearching: false,
                        dcSearch: false
                    });
                    that.transitionToRoute('vips', vips);
                }
            );
        }
    },

    ready: function () {
        return this.get('findToken') && this.get('dc');
    }.property('findToken', 'dc'),

    searchSuccessCallback: function () {
        var that = this;
        return function (vip) {
            that.set('isSearching', false);
            that.transitionToRoute('vip', vip);
        };
    },

    searchFailureCallback: function () {
        var that = this;
        return function (jqXHR) {
            that.setProperties({
                isSearching: false,
                failedSearchToken: that.get('findToken'),
                failedSearchDc: that.get('dc').toUpperCase(),
                failedSearch: true
            });
        };
    },

    getDcs: function () {
        var that = this;
        App.BigIp.dcs().then(function (dcs) {
            that.set('dcs', dcs);
        });
    },

    dcToUpper: function () {
        if (this.get('dc')) {
            return this.get('dc').toUpperCase();
        }
        return '';
    }.property('dc')
});