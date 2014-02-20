/*global console, App, Quarry, Em, $ */
App.PoolDeleteRoute = Em.Route.extend({
    model: function () {
        return this.modelFor('pool');
    },

    setupController: function (controller, model) {
        controller.set('model', model);
        this.controllerFor('confirmation').reset();
    }
});