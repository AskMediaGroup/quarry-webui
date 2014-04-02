/*global App, Em */
App.AssetRekickRoute = Em.Route.extend({
    model: function () {
        return this.modelFor('asset');
    },

    setupController: function (controller, model) {
        this.controllerFor('kickstarts').refresh();
        this.controllerFor('layouts').refresh();
        controller.setProperties({
            optionsSelected: false,
            model: model
        });
    }
});
