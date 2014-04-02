/*global App, Em */
App.MetadatumRoute = Em.Route.extend({
    model: function (params) {
        return App.Metadatum.find(params.name).then(
            function (response) {
                return response;
            }
        );
    },

    serialize: function (model, params) {
        return { name: model.get('name') };
    },

    setupController: function (controller, model) {
        controller.set('model', model);
        controller.set('formUpdated', false);
    }
});
