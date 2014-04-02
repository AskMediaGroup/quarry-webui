/*global window, App, Em, $ */
App.CardstacksController = Em.ArrayController.extend({
    content: [],
    needs: ['application'],

    actions: {
        delCardstack: function (id) {
            var that = this;
            this.composeCardstack(id).then(
                function (cardstack) {
                    that.transitionToRoute('cardstack.delete', cardstack);
                }
            );
        },
        getCard: function (id) {
            var that = this;
            App.Card.find(id).then(
                function (response) {
                    that.transitionToRoute('card', response);
                }
            );
        }
    },

    autoCardstacksLoadId: null,

    sorted: function () {
        return this.get('content').sortBy('name');
    }.property('content.@each.name'),

    find: function () {
        var that = this;
        this.set('isLoading', true);
        return App.Cardstack.find().then(function (cardstacks) {
            $.each(cardstacks, function (i, cardstack) {
                var cards = [];
                $.each(cardstack.cards, function (i, card) {
                    cards.pushObject(App.Card.create(card));
                    cards[i].set('order', i + 1);
                });
                cardstack.set('cards', cards);
            });
            that.setProperties({
                isLoading: false,
                loaded: true
            });
            return cardstacks;
        });
    },

    refresh: function () {
        var that = this;
        this.find().then(function (cardstacks) {
            that.set('content', cardstacks);
        });
    },

    composeCardstack: function (id) {
        return App.Cardstack.find(id).then(
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

    registerAutoCardstacksLoad: function () {
        var intervalId, that = this;
        // We only want to call SetInterval once,
        // so we register the returned interval ID
        if (this.get('autoCardstacksLoadId') === null) {
            intervalId = window.setInterval(function () {
                that.autoLoad();
            }, App.CARDSTACKS_REFRESH);
            this.set('autoCardstacksLoadId', intervalId);
        }
    },

    autoLoad: function () {
        // We don't want to auto-refresh cardstacks data
        // if we're currently looking at the list of cardstacks
        if (this.get('controllers.application').get('currentPath') !== 'cardstacks') {
            this.refresh();
        }
    }
});
