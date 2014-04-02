/*global App, Em */
App.MetadatumDeleteRoute = Em.Route.extend({
    model: function () {
        return this.modelFor('metadatum');
    },

    setupController: function (controller, model) {
        controller.set('model', model);
        this.controllerFor('confirmation').reset();
    }
});
