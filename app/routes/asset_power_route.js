/*global App, Em */
App.AssetPowerRoute = Em.Route.extend({
    model: function (params) {
        return App.Power.create({
            id: this.controllerFor('asset').get('id'),
            action: params.power_action
        });
    },

    serialize: function (model, params) {
        return {
            power_action: model.action
        };
    }
});
