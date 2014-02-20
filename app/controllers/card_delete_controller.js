/*global console, App, Em, $ */
App.CardDeleteController = Em.ObjectController.extend({
    content: {},
    needs: ['card', 'confirmation'],
    readyBinding: 'controllers.confirmation.ready',

    actions: {
        cancel: function () {
            this.transitionToRoute('card', this.get('content'));
        },
        remove: function () {
            var that = this;
            return App.Card.remove(this.get('card_id')).then(
                function success(response) {
                    that.get('controllers.card').set(
                        'status',
                        { deleted: true }
                    );
                    that.transitionToRoute('card', that.get('content'));
                },
                function failure(response) {
                    that.set('status', { updated: false });
                }
            );
        }
    }
});