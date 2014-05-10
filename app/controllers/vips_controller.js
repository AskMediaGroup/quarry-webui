/*global console, App, Em, $ */
/*jslint browser: true*/
App.VipsController = Em.ArrayController.extend({
    content: [],

    actions: {
        loadVip: function (name) {
            var that = this;
            this.set('isLoadingVip', true);
            App.BigIp.findByName(this.get('dc'), name).then(function (vip) {
                that.set('isLoadingVip', false);
                that.transitionToRoute('vip', vip);
            });
        }
    },

    find: function (dc) {
        var that = this;
        this.set('isLoading', true);
        App.BigIp.vips(dc).then(function (vips) {
            that.setProperties({
                isLoading: false,
                loaded: true
            });
            that.set('content', vips);
        });
    }
});