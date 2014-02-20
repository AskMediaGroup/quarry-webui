/*global console, App, Em, $ */
App.AssetPowerRoute = Em.Route.extend({
    model: function (params) {
        return App.Power.create({
            fqdn: this.controllerFor('asset').get('fqdn'),
            action: params.power_action
        });
    },

    serialize: function (model, params) {
        return {
            power_action: model.action
        };
    }
});