/*global console, App, Em, $ */
App.CardsController = Em.ArrayController.extend({
    content: [],

    actions: {
        getCard: function (id) {
            var that = this;
            App.Card.find(id).then(
                function (response) {
                    that.transitionToRoute('card', response);
                }
            );
        }
    },

    sorted: function () {
        return this.get('content').sortBy('name');
    }.property('content.@each.name'),

    find: function () {
        var that = this;
        this.set('isLoading', true);
        return App.Card.find().then(
            function (response) {
                that.setProperties({
                    isLoading: false,
                    loaded: true
                });
                return response;
            }
        );
    },

    refresh: function () {
        var that = this;
        this.find().then(
            function (response) {
                that.set('content', response);
            }
        );
    }
});