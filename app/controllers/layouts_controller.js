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
        return App.Layouts.find({sort: 'name', limit: -1}).then(
            function (response) {
                var ret = [];
                response.data.forEach(function(layout) {
                    ret.pushObject(App.Layouts.create(layout));
                });
                that.set('isLoading', false);
                return ret;
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
