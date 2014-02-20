/*global console, App, Quarry, Em, $ */
App.CardstackDeleteRoute = Em.Route.extend({
    model: function () {
        return this.modelFor('cardstack');
    },

    setupController: function (controller, model) {
        controller.set('model', model);
        this.controllerFor('confirmation').reset();
    }
});