/*global console, App, Quarry, Em, $ */
App.MetadataNewRoute = Em.Route.extend({
    model: function () {
        return App.Meta.create(App.metaSchema);
    },

    setupController: function (controller, model) {
        controller.set('model', App.Meta.create(App.metaSchema));
    }
});