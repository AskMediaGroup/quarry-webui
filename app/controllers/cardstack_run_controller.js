/*global console, App, Em, $ */
App.CardstackRunController = Em.ObjectController.extend({
    content: {},
    needs: ['cardstack', 'serp', 'confirmation'],
    readyBinding: 'controllers.confirmation.ready',

    actions: {
        cancel: function () {
            this.transitionToRoute('cardstack', this.get('content'));
        },
        run: function () {
            var that = this, query = this.get('query') ||
                this.get('controllers.serp').get('searchTerms.asset');
            App.Cardstack.run(this.get('cardstack_id'), query).then(
                function (job) {
                    that.transitionToRoute('job', App.Job.create(job));
                }
            );
        }
    },

    getAssets: function () {
        var that = this, query = this.get('query') ||
            this.get('controllers.serp').get('searchTerms');
        App.Serp.find(query).then(
            function (response) {
                that.set('assets', response.assets);
            }
        );
    }
});