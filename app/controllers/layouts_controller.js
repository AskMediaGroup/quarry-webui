/*global App, Em */
App.LayoutsController = Em.ArrayController.extend({
    content: [],
    needs: ['application'],

    actions: {
        getLayout: function (id) {
            var that = this;
            App.Layout.find(id).then(
                function (response) {
                    that.transitionToRoute('layout', response);
                }
            );
        }
    },

    childOutlet: function () {
        return this.get('controllers.application').get(
            'currentPath'
        ) !== 'layouts.index';
    }.property('controllers.application.currentPath'),

    find: function () {
        var that = this;
        this.set('isLoading', true);
        return App.Layout.find().then(
            function (response) {
                that.set('isLoading', false);
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
