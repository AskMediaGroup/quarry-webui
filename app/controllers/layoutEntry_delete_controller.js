/*global App, Em */
App.LayoutEntryDeleteController = Em.ObjectController.extend({
    content: {},
    needs: ['layout', 'confirmation'],
    readyBinding: 'controllers.confirmation.ready',

    actions: {
        remove: function () {
            var that = this;
            return App.LayoutEntries.remove(this.get('entry_id')).then(
                function success(response) {
                    that.get('controllers.layout').set(
                        'status',
                        { updated: true }
                    );
                    that.transitionToRoute('layout');
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
            if (this.get('controllers.layout').get('content')) {
                this.transitionToRoute(
                    'layout',
                    this.get('controllers.layout').get('content')
                );
            } else {
                this.transitionToRoute('layouts');
            }
        }
    }
});
