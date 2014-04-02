/*global App, Em, $ */
App.CardstackRoute = Em.Route.extend({
    model: function (params) {
        this.controllerFor('cardstack').set('isLoading', true);
        return App.Cardstack.find(params.cardstack_id).then(
            function (cardstack) {
                var cards = [];
                $.each(cardstack.cards, function (i, card) {
                    cards.pushObject(App.Card.create(card));
                    cards[i].set('order', i + 1);
                });
                cardstack.set('cards', cards);
                return cardstack;
            }
        );
    },

    serialize: function (model, params) {
        return { cardstack_id: model.cardstack_id };
    },

    setupController: function (controller, model) {
        this.controllerFor('cards').refresh();
        controller.set('model', model);
        controller.setProperties({
            newCards: [],
            isLoading: false,
            formUpdated: false
        });
    }
});
