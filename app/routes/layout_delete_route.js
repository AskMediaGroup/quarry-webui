/*global App, Em */
App.LayoutDeleteRoute = Em.Route.extend({
    model: function () {
        return this.modelFor('layout');
    },

    setupController: function (controller, model) {
        controller.set('model', model);
        this.controllerFor('confirmation').reset();
    }
});
