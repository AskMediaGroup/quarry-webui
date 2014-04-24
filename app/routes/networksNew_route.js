/*global App, Em */
App.NetworksNewRoute = Em.Route.extend({
    model: function () {
        return App.Networks.create(App.networkSchema);
    },

    setupController: function (controller, model) {
        controller.setProperties({
            model: App.Networks.create(App.networkSchema),
            status: undefined
        });
    }
});
