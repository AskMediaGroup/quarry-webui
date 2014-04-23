/*global App, Em */
App.AssetRenameController = Em.ObjectController.extend({
    content: {},
    needs: ['confirmation'],
    readyBinding: 'controllers.confirmation.ready',

    actions: {
        cancel: function () {
            this.setProperties({
                optionsSelected: false,
                content: {}
            });
            this.transitionToRoute('asset.index');
        },
        rename: function () {
            var that = this;
            return App.Mortar.rename(
                this.get('content.id'),
                this.get('newName').toLowerCase() + App.DOMAIN_SUFFIX,
                this.get('reboot')
            ).then(
                function (response) {
                    // App.Mortar.rename returns a job object, so we
                    // pass that to the 'job' route as its model
                    that.transitionToRoute('job', App.Jobs.create(response));
                }
            );
        },
        confirm: function () {
            this.set('optionsSelected', true);
            this.get('controllers.confirmation').reset();
        }
    },

    newFqdn: function () {
        return this.get('newName') + App.DOMAIN_SUFFIX;
    }.property('newName'),

    optionsReady: function () {
        return (this.get('newName') ? true : false);
    }.property('newName')
});
