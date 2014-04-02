/*global App, Em */
App.CardstacksNewController = Em.ObjectController.extend({
    content: {},

    actions: {
        add: function () {
            var cardstack, that = this;
            this.setProperties({
                nameAlert: this.get('missingName')
            });
            if (this.get('validated')) {
                this.setProperties({
                    nameAlert: null
                });
                cardstack = App.Cardstack.create({
                    name: this.get('name')
                });
                if (this.get('query')) {
                    cardstack.query = { 'FQDN': this.get('query') };
                }
                App.Cardstack.add(cardstack).then(
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
            App.Cardstack.find(this.get('cardstack_id')).then(
                function (response) {
                    that.transitionToRoute('cardstack', response);
                }
            );
        },
        retry: function () {
            this.set('status', undefined);
        },
        cancel: function () {
            this.transitionToRoute('cardstacks');
        }
    },

    missingName: function () {
        return this.get('name') ? false : true;
    }.property('name'),

    validated: function () {
        return (!this.get('missingName'));
    }.property('missingName')
});
