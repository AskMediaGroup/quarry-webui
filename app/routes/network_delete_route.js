/*global console, App, Quarry, Em, $ */
App.NetworkDeleteRoute = Em.Route.extend({
    model: function () {
        return this.modelFor('network');
    },

    setupController: function (controller, model) {
        controller.set('model', model);
        this.controllerFor('confirmation').reset();
    }
});