/*global App, Em */
App.LayoutEntryDeleteRoute = Em.Route.extend({
    model: function () {
        return this.modelFor('layoutEntry');
    },

    setupController: function (controller, model) {
        controller.set('model', model);
        this.controllerFor('confirmation').reset();
    }
});
