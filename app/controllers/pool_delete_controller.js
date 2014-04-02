/*global App, Em */
App.PoolDeleteController = Em.ObjectController.extend({
    content: {},
    needs: ['pool', 'confirmation'],
    readyBinding: 'controllers.confirmation.ready',

    actions: {
        remove: function () {
            var that = this;
            return App.Pool.remove(this.get('name')).then(
                function success(response) {
                    that.get('controllers.pool').set(
                        'status',
                        { deleted: true }
                    );
                    that.transitionToRoute('pool', that.get('content'));
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
            this.transitionToRoute('pool', this.get('content'));
        }
    }
});
