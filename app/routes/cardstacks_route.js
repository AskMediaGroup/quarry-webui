/*global App, Em */
App.CardstacksRoute = Em.Route.extend({
    setupController: function (controller, model) {
        controller.find().then(
            function (response) {
                controller.set('model', response);
            }
        );
    }
});
