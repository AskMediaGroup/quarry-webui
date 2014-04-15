/*global App, Em */
App.NetworksController = Em.ArrayController.extend({
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
        return App.Network.find().then(
            function (networks_data) {
                var networks = [];
                networks_data.forEach(function (network, index, enumerable) {
                    var totalIps, availIps;
                    totalIps = Math.pow(
                        2,
                        32 - App.netmaskToCidr(network.netmask)
                    ) - 2;
                    App.Ip.find({
                        limit: 0,
                        where: {
                            network_id: network.network_id
                        }
                    }).then(
                        function(ips) {
                            availIps = totalIps - ips.total;
                            network.setProperties({
                                totalIps: totalIps,
                                availIps: availIps
                            });
                            networks.pushObject(App.Network.create(network));
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
