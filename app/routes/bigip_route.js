/*global console, App, Em, $ */
App.BigIpRoute = Em.Route.extend({
    model: function () {
        return {};
    },

    setupController: function (controller, model) {
        controller.getDcs();
        controller.set('model', {});
    }
});