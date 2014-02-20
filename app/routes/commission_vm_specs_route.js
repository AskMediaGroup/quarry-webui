/*global console, App, Em, $ */
App.CommissionVmSpecsRoute = Em.Route.extend({
    model: function (params) {
        var commissionTargets = [App.CommissionVmSpecs.create({
            index: 1
        })];
        return commissionTargets;
    },

    renderTemplate: function () {
        this.controllerFor('commissionVm').set('showTemplate', false);
        this.render('commissionVm.specs');
    },

    setupController: function (controller, model) {
        this.controllerFor('hypervisors').refresh();
        controller.set('fqdnsChecked', 0);
        controller.set('model', model);
    }
});