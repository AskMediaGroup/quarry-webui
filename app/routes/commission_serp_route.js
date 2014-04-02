/*global App, Em */
App.CommissionSerpRoute = Em.Route.extend({
    model: function (params) {
        return this.controllerFor('commissionVm.specs').get('content');
    },

    setupController: function (controller, model) {
        controller.set('model', model);
    }
});
