/*global App, Em */
App.NetworksController = Em.ArrayController.extend(App.NetworkStats, {
    content: [],
    needs: ['application'],

    childOutlet: function () {
        return this.get('controllers.application').get(
            'currentPath'
        ) === 'networks.new';
    }.property('controllers.application.currentPath'),

    find: function () {
        var that = this;
        this.set('isLoading', true);
        return App.Networks.find().then(
            function (networks_data) {
                var networks = [];
                networks_data.forEach(function (network, index, enumerable) {
                    that.getStats(network).then(
                        function (network_with_stats) {
                            networks.pushObject(network_with_stats);
                        }
                    );
                });
                that.set('isLoading', false);
                return networks;
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
