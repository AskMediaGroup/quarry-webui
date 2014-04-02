/*global App, Em, $ */
App.AssetCardstackRoute = Em.Route.extend({
    model: function (params) {
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
        controller.set('model', model);
        this.controllerFor('confirmation').reset();
    }
});
