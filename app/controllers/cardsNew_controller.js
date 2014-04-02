/*global App, Em */
App.CardsNewController = Em.ObjectController.extend({
    content: {},

    actions: {
        add: function () {
            var card, that = this;
            this.setProperties({
                nameAlert: this.get('missingName'),
                commandAlert: this.get('missingCommand')
            });
            if (this.get('validated')) {
                this.setProperties({
                    nameAlert: null,
                    commandAlert: null
                });
                card = App.Card.create({
                    name: this.get('name'),
                    command: this.get('command')
                });
                App.Card.add(card).then(
                    function success(response) {
                        that.setProperties({
                            content: response,
                            status: { added: true }
                        });
                    },
                    function failure(response) {
                        that.set('status', { added: false });
                    }
                );
            }
        },
        edit: function () {
            var that = this;
            App.Card.find(this.get('card_id')).then(
                function (response) {
                    that.transitionToRoute('card', response);
                }
            );
        },
        retry: function () {
            this.set('status', undefined);
        },
        cancel: function () {
            this.transitionToRoute('cards');
        }
    },

    missingName: function () {
        return this.get('name') ? false : true;
    }.property('name'),

    missingCommand: function () {
        return this.get('command') ? false : true;
    }.property('command'),

    validated: function () {
        return (!this.get('missingName') && !this.get('missingCommand'));
    }.property('missingName', 'missingCommand')
});
