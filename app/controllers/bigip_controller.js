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
            App.BigIp.findByName(this.get('dc'), this.get('findToken')).then(
                function success(vip) {
                    that.set('isSearching', false);
                    that.transitionToRoute('vip', vip);
                },
                function failure(jqXHR) {
                    that.setProperties({
                        isSearching: false,
                        failedSearch: true
                    });
                }
            );
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