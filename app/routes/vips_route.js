/*global console, App, Em, $ */
App.VipsRoute = Em.Route.extend({
    model: function (params) {
        var that = this;
        this.controllerFor('vips').setProperties({
            isLoading: true,
            dc: params.dc
        });
        return App.BigIp.vips(params.dc).then(
            function (vips) {
                that.controllerFor('vips').set('isLoading', false);
                return vips;
            }
        );
    },

    serialize: function (model, params) {
        return {
            dc: this.controllerFor('bigIp').get('dc')
        };
    },

    setupController: function (controller, model) {
        if (model) {
            controller.set('model', model);
        } else {
            controller.set('model', []);
        }
    }
});