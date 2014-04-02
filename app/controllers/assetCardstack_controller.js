/*global App, Em */
App.AssetCardstackController = Em.ObjectController.extend({
    content: {},
    needs: ['asset', 'confirmation'],
    readyBinding: 'controllers.confirmation.ready',

    actions: {
        cancel: function () {
            this.transitionToRoute('asset.index');
        },
        run: function () {
            var that = this;
            App.Cardstack.run(
                this.get('cardstack_id'),
                { FQDN: '^' + this.get('controllers.asset.FQDN') + '$' }
            ).then(
                function (job) {
                    that.transitionToRoute('job', App.Job.create(job));
                }
            );
        }
    }
});
