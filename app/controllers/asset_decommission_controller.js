/*global App, Em */
App.AssetDecommissionController = Em.ObjectController.extend({
    content: {},
    needs: ['confirmation'],
    readyBinding: 'controllers.confirmation.ready',

    actions: {
        cancel: function () {
            this.transitionToRoute('asset.index');
        },
        decommission: function () {
            var that = this;
            return App.Mortar.decommission(this.get('content.id')).then(
                function (response) {
                    // App.Mortar.decommission returns a job object, so we
                    // pass that to the 'job' route as its model
                    that.transitionToRoute('job', App.Job.create(response));
                }
            );
        }
    }
});
