/*global console, App, Quarry, Em, $ */
App.CommandController = Em.ObjectController.extend({
    content: {},
    needs: ['serp'],
    queryBinding: 'controllers.serp.searchTerms.asset',

    actions: {
        run: function () {
            this.transitionToRoute('command.run');
        }
    }
});