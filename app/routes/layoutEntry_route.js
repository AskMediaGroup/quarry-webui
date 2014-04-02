/*global App, Em */
App.LayoutEntryRoute = Em.Route.extend({
    model: function (params) {
        App.Layout.findEntry(1, params.entry).then(
            function (response) {
                return App.LayoutEntry.create(response);
            }
        );
    },

    setupController: function (controller, model) {
        controller.set('model', model);
    }
});
