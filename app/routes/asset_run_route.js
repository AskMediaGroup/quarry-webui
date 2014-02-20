/*global console, App, Em, $ */
App.AssetRunRoute = Em.Route.extend({
    model: function () {
        return this.modelFor('asset');
    },

    setupController: function (controller, model) {
        controller.setProperties({
            command: '',
            confirming: false
        });
    }
});