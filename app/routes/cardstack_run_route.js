/*global App, Em */
App.CardstackRunRoute = Em.Route.extend({
    model: function () {
        return this.modelFor('cardstack');
    },

    setupController: function (controller, model) {
        controller.set('model', model);
        controller.getAssets();
        this.controllerFor('confirmation').reset();
    }
});
