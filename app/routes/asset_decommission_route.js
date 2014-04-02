/*global App, Em */
App.AssetDecommissionRoute = Em.Route.extend({
    model: function () {
        return this.modelFor('asset');
    },

    setupController: function (controller, model) {
        controller.set('model', model);
        this.controllerFor('confirmation').reset();
    }
});
