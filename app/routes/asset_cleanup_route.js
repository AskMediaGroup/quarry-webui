/*global console, App, Em, $ */
App.AssetCleanupRoute = Em.Route.extend({
    model: function () {
        return this.modelFor('asset');
    },

    setupController: function (controller, model) {
        controller.set('model', model);
        this.controllerFor('confirmation').reset();
    }
});