/*global App, Em */
App.AddPhysicalSpecsRoute = Em.Route.extend({
    model: function (params) {
        var commissionTargets = [App.AddPhysicalSpecs.create({
            index: 1
        })];
        return commissionTargets;
    },

    renderTemplate: function () {
        this.controllerFor('addPhysical').set('showTemplate', false);
        this.render('addPhysical.specs');
    },

    setupController: function (controller, model) {
        controller.set('fqdnsChecked', 0);
        controller.set('model', model);
    }
});
