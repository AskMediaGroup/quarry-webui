/*global console, App, Em, $ */
App.VipRoute = Em.Route.extend({
    model: function (params) {
        var that = this;
        this.controllerFor('vip').set('isLoading', true);
        return App.BigIp.findByName(params.dc, params.vip_name).then(
            function (vip) {
                that.controllerFor('vip').set('isLoading', false);
                return vip;
            }
        );
    },

    serialize: function (model, params) {
        return {
            dc: this.controllerFor('bigIp').get('dc') || this.controllerFor('vips').get('dc'),
            vip_name: model.name
        };
    },

    setupController: function (controller, model) {
        controller.set('model', model);
    }
});