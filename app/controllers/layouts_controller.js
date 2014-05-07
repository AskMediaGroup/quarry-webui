/*global App, Em */
App.LayoutsController = Em.ArrayController.extend({
    content: [],
    needs: ['application'],

    actions: {
        getLayout: function (id) {
            var that = this;
            App.Layouts.find(id).then(
                function (layout) {
                    that.transitionToRoute('layout', layout);
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
        return App.Layouts.find().then(
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
