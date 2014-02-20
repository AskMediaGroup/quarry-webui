/*global console, App, Em, $ */
App.CardRoute = Em.Route.extend({
    model: function (params) {
        this.controllerFor('card').set('isLoading', true);
        return App.Card.find(params.card_id).then(
            function (response) {
                return response;
            }
        );
    },

    serialize: function (model, params) {
        return { card_id: model.card_id };
    },

    setupController: function (controller, model) {
        controller.set('model', model);
        controller.setProperties({
            formUpdated: false,
            isLoading: false
        });
    }
});