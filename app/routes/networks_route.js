/*global App, Em */
App.NetworksRoute = Em.Route.extend({
    setupController: function (controller, model) {
        controller.find().then(
            function (response) {
                controller.set('model', response);
            }
        );
    }
});
