/*global console, App, Quarry, Em, $ */
App.VipController = Em.ObjectController.extend({
    content: {},

    actions: {
    },

    refresh: function () {
        var that = this;
        this.set('isLoading', true);
        App.BigIp.findByName(this.get('name')).then(
            function (vip) {
                that.set('content', vip);
                that.set('isLoading', false);
            }
        );
    }
});