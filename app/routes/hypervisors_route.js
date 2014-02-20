/*global console, App, Em, $ */
App.HypervisorsRoute = Em.Route.extend({
    setupController: function (controller, model) {
        controller.find().then(
            function (response) {
                controller.set('model', response);
            }
        );
    }
});