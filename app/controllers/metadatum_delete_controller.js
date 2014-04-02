/*global App, Em */
App.MetadatumDeleteController = Em.ObjectController.extend({
    content: {},
    needs: ['metadatum', 'confirmation'],
    nameBinding: 'controllers.metadatum.name',
    readyBinding: 'controllers.confirmation.ready',

    actions: {
        remove: function () {
            var that = this;
            return App.Meta.remove(this.get('name')).then(
                function (metadatum) {
                    that.transitionToRoute('metadata.index');
                }
            );
        },
        cancel: function () {
            this.transitionToRoute('metadatum.index');
        }
    }
});
