/*global App, Em */
App.NetworksController = Em.ArrayController.extend({
    content: [],
    needs: ['application'],

    childOutlet: function () {
        return this.get('controllers.application').get(
            'currentPath'
        ) === 'networks.new';
    }.property('controllers.application.currentPath'),

    find: function (gateway) {
        var that = this;
        this.set('isLoading', true);
        return App.Network.find(gateway).then(
            function (response) {
                that.set('isLoading', false);
                return response;
            }
        );
    },

    refresh: function () {
        var that = this;
        return this.find().then(
            function (response) {
                that.set('content', response);
                return response;
            }
        );
    }
});
