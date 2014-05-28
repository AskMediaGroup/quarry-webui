/*global App, Em */
App.AssetPowerController = Em.ObjectController.extend({
    actions: {
        cancel: function () {
            this.transitionToRoute('asset.index');
        },

        push: function () {
            var that = this;
            return App.Power.push(
                this.get('content.action'),
                this.get('content.id')
            ).then(
                function (response) {
                    // App.Power.push returns a job object, so we
                    // pass that to the 'job' route as its model
                    that.transitionToRoute('job', App.Jobs.create(response));
                }
            );
        }
    }
});
