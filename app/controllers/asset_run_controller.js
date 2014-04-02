/*global App, Em */
App.AssetRunController = Em.ObjectController.extend({
    content: {},
    needs: ['asset', 'confirmation'],
    readyBinding: 'controllers.confirmation.ready',

    actions: {
        cancel: function () {
            this.set('confirming', false);
            this.transitionToRoute('asset.index');
        },
        run: function () {
            var that = this;
            App.Command.run(
                this.get('command'),
                { FQDN: '^' + this.get('controllers.asset.FQDN') + '$' }
            ).then(
                function (job) {
                    that.transitionToRoute('job', App.Job.create(job));
                }
            );
        },
        confirm: function () {
            this.set('confirming', true);
            this.get('controllers.confirmation').reset();
        }
    }
});
