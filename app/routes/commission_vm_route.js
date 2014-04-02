/*global App, Em */
App.CommissionVmRoute = Em.Route.extend({
    model: function (params) {
        this.controllerFor('commissionVm').freshen();
        return App.CommissionVmHostSpecs.create();
    },

    renderTemplate: function () {
        this.controllerFor('commissionVm').set('showTemplate', true);
        this.render('commissionVm');
    },

    setupController: function (controller, model) {
        this.controllerFor('blade').refreshRoles();
        this.controllerFor('kickstarts').refresh();
        this.controllerFor('layouts').refresh();
        this.controllerFor('pools').refresh();
        controller.set('model', model);
    }
});
