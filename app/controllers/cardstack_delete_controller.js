/*global App, Em */
App.CardstackDeleteController = Em.ObjectController.extend({
    content: {},
    needs: ['cardstack', 'confirmation'],
    readyBinding: 'controllers.confirmation.ready',

    actions: {
        remove: function () {
            var that = this;
            return App.Cardstack.remove(this.get('cardstack_id')).then(
                function success(response) {
                    that.get('controllers.cardstack').set(
                        'status',
                        { deleted: true }
                    );
                    that.transitionToRoute('cardstack', that.get('content'));
                },
                function failure(response) {
                    that.set('status', { updated: false });
                }
            );
        },
        retry: function () {
            this.validate();
        },
        cancel: function () {
            this.transitionToRoute('cardstack', this.get('content'));
        }
    }
});
