/*global App, Em */
App.NetworksNewRoute = Em.Route.extend({
    model: function () {
        return App.Network.create(App.networkSchema);
    },

    setupController: function (controller, model) {
        controller.setProperties({
            model: App.Network.create(App.networkSchema),
            status: undefined
        });
    }
});
