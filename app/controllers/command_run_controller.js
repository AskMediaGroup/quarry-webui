/*global console, App, Em, $ */
App.CommandRunController = Em.ObjectController.extend({
    content: {},
    needs: ['command', 'serp', 'confirmation'],
    commandBinding: 'controllers.command.command',
    queryBinding: 'controllers.command.query',
    readyBinding: 'controllers.confirmation.ready',

    actions: {
        cancel: function () {
            this.transitionToRoute('cardstack', this.get('content'));
        },
        run: function () {
            var that = this;
            App.Command.run(this.get('command'), this.get('query')).then(
                function (job) {
                    that.transitionToRoute('job', App.Job.create(job));
                }
            );
        }
    },

    getAssets: function () {
        var that = this, query;
        query = this.get('controllers.serp').get('searchTerms');
        App.Serp.find(query).then(
            function (response) {
                that.set('assets', response.assets);
            }
        );
    }
});