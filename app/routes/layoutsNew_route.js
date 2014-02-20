/*global console, App, Quarry, Em, $ */
App.LayoutsNewRoute = Em.Route.extend({
    model: function () {
        return App.Layout.create(App.layoutSchema);
    },

    setupController: function (controller, model) {
        controller.setProperties({
            model: App.Layout.create(App.layoutSchema),
            status: undefined
        });
    }
});