/*global App, Em */
App.NetworkDeleteController = Em.ObjectController.extend({
    content: {},
    needs: ['network', 'confirmation'],
    readyBinding: 'controllers.confirmation.ready',

    actions: {
        remove: function () {
            var that = this;
            return App.Networks.remove(this.get('network_id')).then(
                function success(response) {
                    that.get('controllers.network').set(
                        'status',
                        { deleted: true }
                    );
                    that.transitionToRoute('network', that.get('content'));
                },
                function failure(response) {
                    that.set('status', { updated: false });
                }
            );
        },
        retry: function () {
            this.set('status', undefined);
            this.get('controllers.confirmation').reset();
        },
        cancel: function () {
            this.transitionToRoute('network', this.get('content'));
        }
    }
});
