/*global App, Em */
App.AssetCleanupController = Em.ObjectController.extend({
    content: {},
    need: ['confirmation'],
    readyBinding: 'controllers.confirmation.ready',

    actions: {
        cancel: function () {
            this.transitionToRoute('asset.index');
        },
        assetCleanup: function () {
            var that = this;
            return App.Mortar.asset_cleanup(this.get('content.id')).then(
                function (response) {
                    // App.Mortar.decommission returns a job object, so we
                    // pass that to the 'job' route as its model
                    that.transitionToRoute('job', App.Jobs.create(response));
                }
            );
        }
    }
});
