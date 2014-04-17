/*global App, Em */
App.NetworkRoute = Em.Route.extend(App.NetworkStats, {
    model: function (params) {
        return App.Network.find(params.gateway).then(
            function (data) {
                return data;
            }
        );
    },

    serialize: function (model, params) {
        return { gateway: model.get('gateway') };
    },

    setupController: function (controller, model) {
        if (!model.get('hasStats')) {
            this.getStats(model).then(
                function (network) {
                    controller.setProperties({
                        model: network,
                        network_gateway: network.gateway,
                        status: undefined
                    });
                    controller.set('formUpdated', false);
                }
            );
        } else {
            controller.setProperties({
                model: model,
                network_gateway: model.gateway,
                status: undefined
            });
            controller.set('formUpdated', false);
        }
    }
});
