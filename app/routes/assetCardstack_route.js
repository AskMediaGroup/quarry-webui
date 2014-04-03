/*global App, Em, $ */
App.AssetCardstackRoute = Em.Route.extend({
    model: function (params) {
        return App.Cardstack.find(params.cardstack_id).then(
            function (cardstack) {
                var i, k, cards = [];
                for (i = 0, k = cardstack.cards.length; i < k; i += 1) {
                    cards.pushObject(App.Card.create(cardstack.cards[i]));
                    cards[i].set('order', i + 1);
                }
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
