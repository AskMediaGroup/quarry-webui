/*global App, Em */
App.CardDeleteRoute = Em.Route.extend({
    model: function () {
        return this.modelFor('card');
    },

    setupController: function (controller, model) {
        controller.set('model', model);
        this.controllerFor('confirmation').reset();
    }
});
