/*global App, Em */
App.CardsNewRoute = Em.Route.extend({
    model: function () {
        this.controllerFor('cards.new').set('status', undefined);
        return App.Card.create(App.cardSchema);
    },

    setupController: function (controller, model) {
        controller.setProperties({
            model: App.Card.create(App.cardSchema),
            status: undefined
        });
    }
});
