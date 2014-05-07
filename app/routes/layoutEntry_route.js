/*global App, Em */
App.LayoutEntryRoute = Em.Route.extend({
    model: function (params) {
        App.Layouts.findEntry(1, params.entry).then(
            function (response) {
                return App.LayoutEntries.create(response);
            }
        );
    },

    setupController: function (controller, model) {
        controller.set('model', model);
    }
});
