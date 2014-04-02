/*global App, Em */
App.CommissionVmSpecsRoute = Em.Route.extend({
    model: function (params) {
        // TODO: enable URL route support
        return [];
    },

    serialize: function (model, params) {
        // TODO: make 'VM Commission Specs' persistent
        return { specs: 'specs' };
    },

    setupController: function (controller, model) {
        this.controllerFor('hypervisors').refresh();
        controller.set('fqdnsChecked', 0);
        controller.set('model', model);
    },

    renderTemplate: function () {
        this.controllerFor('commissionVm').set('showTemplate', false);
        this.render('commissionVm.specs');
    }
});
