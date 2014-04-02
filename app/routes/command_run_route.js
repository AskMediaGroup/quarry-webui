/*global App, Em */
App.CommandRunRoute = Em.Route.extend({
    model: function () {
        return this.modelFor('command');
    },

    setupController: function (controller, model) {
        controller.getAssets();
        this.controllerFor('confirmation').reset();
    }
});
