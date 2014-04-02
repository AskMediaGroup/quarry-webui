/*global App, Em */
App.AssetRenameRoute = Em.Route.extend({
    model: function () {
        return this.modelFor('asset');
    },

    setupController: function (controller, model) {
        controller.setProperties({
            optionsSelected: false,
            model: model
        });
    }
});
