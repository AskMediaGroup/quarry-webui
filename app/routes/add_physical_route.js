/*global console, App, Em, $ */
App.AddPhysicalRoute = Em.Route.extend({
    model: function (params) {
        return App.AddPhysicalSpecs.create();
    },

    renderTemplate: function () {
        this.controllerFor('addPhysical').set('showTemplate', true);
        this.render('addPhysical');
    },

    setupController: function (controller, model) {
        this.controllerFor('networks').refresh();
        controller.set('model', model);
    }
});