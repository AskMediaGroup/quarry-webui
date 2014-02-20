/*global console, App, Em, $ */
App.MortarBulkRoute = Em.Route.extend({
    serialize: function (model, params) {
        return { bulk_id: model.bulk_id };
    },

    setupController: function (controller, model) {
        controller.setProperties({
            confirming: false,
            model: model
        });
    }
});