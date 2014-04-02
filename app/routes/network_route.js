/*global App, Em */
App.NetworkRoute = Em.Route.extend({
    model: function (params) {
        return App.Network.find(params.gateway).then(
            function (response) {
                return response;
            }
        );
    },

    serialize: function (model, params) {
        return { gateway: model.get('gateway') };
    },

    setupController: function (controller, model) {
        controller.setProperties({
            model: model,
            network_gateway: model.get('gateway'),
            status: undefined
        });
        controller.set('formUpdated', false);
    }
});
