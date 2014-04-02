/*global App, Em, $ */
App.CardstackController = Em.ObjectController.extend({
    content: {},
    needs: ['application', 'cards'],
    allCardsBinding: 'controllers.cards.content',
    currentPathBinding: 'controllers.application.currentPath',
    newCards: [],

    actions: {
        reload: function () {
            this.refresh();
        },
        addCard: function () {
            this.get('newCards').pushObject(Em.Object.create({
                name: '',
                command: ''
            }));
        },
        promoteOrder: function (card) {
            var that = this;
            App.Cardstack.promote_card(
                this.get('cardstack_id'),
                card.get('card_id')
            ).then(
                function (response) {
                    that.refresh();
                }
            );
        },
        demoteOrder: function (card) {
            var that = this;
            App.Cardstack.demote_card(
                this.get('cardstack_id'),
                card.get('card_id')
            ).then(
                function (response) {
                    that.refresh();
                }
            );
        },
        delNewCard: function (card) {
            this.get('newCards').removeObject(card);
        },
        delCard: function (card) {
            var that = this;
            App.Cardstack.remove_card(
                this.get('cardstack_id'),
                card.get('card_id'),
                card.get('order') * 10
            ).then(
                function (response) {
                    that.refresh();
                }
            );
        },
        update: function () {
            var cardstack, cruft = [], that = this;
            if (this.get('newCards')) {
                this.get('newCards').forEach(function (item, index, enumerable) {
                    if (item.get('card_id')) {
                        App.Cardstack.add_card(
                            that.get('cardstack_id'),
                            item.get('card_id')
                        ).then(
                            function success(response) {
                                that.get('newCards').removeObject(item);
                                return response;
                            },
                            function failure(response) {
                                return response;
                            }
                        );
                    } else {
                        cruft.pushObject(item);
                    }
                });
                // If the user left around any empty 'new card' rows
                this.get('newCards').removeObjects(cruft);
            }
            cardstack = App.Cardstack.create({
                name: this.get('name')
            });
            if (this.get('query')) {
                cardstack.query = JSON.stringify({ 'FQDN': this.get('query') });
            }
            App.Cardstack.update(this.get('cardstack_id'), cardstack).then(
                function success(response) {
                    that.set('status', { updated: true });
                },
                function failure(response) {
                    that.set('status', { updated: false });
                }
            );
        },
        remove: function () {
            this.transitionToRoute('cardstack.delete', this.get('content'));
        }
    },

    refresh: function () {
        var that = this;
        this.set('isLoading', true);
        App.Cardstack.find(this.get('cardstack_id')).then(
            function (cardstack) {
                var cards = [];
                $.each(cardstack.cards, function (i, card) {
                    cards.pushObject(App.Card.create(card));
                    cards[i].set('order', i + 1);
                });
                cardstack.set('cards', cards);
                that.set('content', cardstack);
                that.setProperties({
                    isLoading: false,
                    formUpdated: false,
                    status: undefined
                });
                that.get('controllers.cards').refresh();
            }
        );
    },

    formObserver: function () {
        this.set('formUpdated', true);
    }.observes('name', 'query'),

    newCardsObserver: function () {
        if (this.get('newCards').length > 0) {
            this.set('formUpdated', true);
        }
    }.observes('newCards.@each'),

    inUse: function () {
        switch (this.get('currentPath')) {
        case 'cardstack.delete':
            return true;
        case 'cardstack.run':
            return true;
        default:
            return false;
        }
    }.property('currentPath'),

    deleteState: function () {
        return this.get('currentPath') === 'cardstack.delete' ? true : false;
    }.property('currentPath')
});
