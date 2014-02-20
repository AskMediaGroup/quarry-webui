/*global console, App, Quarry, Em, $ */
App.PoolsNewRoute = Em.Route.extend({
    model: function () {
        return App.Pool.create(App.poolSchema);
    },

    setupController: function (controller, model) {
        this.controllerFor('networks').refresh();
        controller.setProperties({
            model: App.Pool.create(App.poolSchema),
            status: undefined
        });
    }
});