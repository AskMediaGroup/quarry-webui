/*global console, App, Em, $ */
App.IndexRoute = Em.Route.extend({
    setupController: function (controller, model) {
        if (!this.controllerFor('jobs').get('loaded')) {
            this.controllerFor('jobs').refresh();
        }
        if (!this.controllerFor('cardstacks').get('loaded')) {
            this.controllerFor('cardstacks').refresh();
        }
        this.controllerFor('cloudStats').getCloudStats();
    }
});