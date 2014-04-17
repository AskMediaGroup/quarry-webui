/*global App, Em */
/**
 This mixin provides a getStats() function that calculates IP address usage
 stats for a particular network.

 1) we calculate the total IP address space for the network model object
 2) we retrieve from the API the number of existing IP address records in
    that network (passing limit=0 requests a result count only, no data)
 3) we perform a discrete asynchronous request for each IP address type,
    (again, result count only), and save the total value for each IP address
    type in the passed-in network model object

 @class App.NetworkStats
 @extends Ember.Mixin
 @namespace App
 @module NetworkStats
 **/
App.NetworkStats = Em.Mixin.create({
    /**
     Returns a Promise

     @method getStats
     @param {Network} network Network model object
     @return {Promise}
     */
    getStats: function (network) {
        var totalIps;
        // Calculate the total IP address space for a CIDR block
        totalIps = Math.pow(
            2,
            32 - App.netmaskToCidr(network.netmask)
        ) - 2;
        // Get the number of IP address records in a particular network
        return App.Ip.find({
            limit: 0,
            where: {
                network_id: network.network_id
            }
        }).then(
            function(ips) {
                var availIps, i;
                availIps = totalIps - ips.total;
                // Store IP address usage stats in the network model object
                network.setProperties({
                    totalIps: totalIps,
                    usedIps: ips.total,
                    availIps: availIps
                });
                // Callback function for fulfilled promise
                function filterByType (ipType) {
                    return function (ips) {
                        // Store IP type usage stats in the network model object
                        network.set('type' + ipType + 'Ips', ips.total);
                    };
                }
                // For each IP address type, get the number of IP address
                // records in a particular network
                for (i = 1; i <= 5; i += 1) {
                    App.Ip.find({
                        limit: 0,
                        where: {
                            network_id: network.network_id,
                            type: i
                        }
                    }).then(filterByType(i));
                }
                return network;
            }
        );
    }
});