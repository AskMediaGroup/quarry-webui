/*global console, App, Em, $ */
App.LayoutDeleteController = Em.ObjectController.extend({
    content: {},
    needs: ['layout', 'confirmation'],
    readyBinding: 'controllers.confirmation.ready',

    actions: {
        remove: function () {
            var that = this;
            return App.Layout.remove(this.get('partlayout_id')).then(
                function success(response) {
                    that.get('controllers.layout').set(
                        'status',
                        { deleted: true }
                    );
                    that.transitionToRoute('layout', that.get('content'));
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
            this.transitionToRoute('layout', this.get('content'));
        }
    }
});