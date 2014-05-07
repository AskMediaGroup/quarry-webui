/*global App, Em */
App.LayoutsNewRoute = Em.Route.extend({
    model: function () {
        return App.Layouts.create(App.layoutSchema);
    },

    setupController: function (controller, model) {
        controller.setProperties({
            model: App.Layouts.create(App.layoutSchema),
            status: undefined
        });
    }
});
