/*global console, App, Quarry, Em, $ */
App.NetworkController = Em.ObjectController.extend({
    content: {},
    needs: ['application'],

    actions: {
        refresh: function () {
            var that = this;
            App.Network.find(this.get('network_gateway')).then(
                function (response) {
                    that.setProperties({
                        content: response,
                        network_gateway: response.get('gateway'),
                        status: undefined
                    });
                    that.set('formUpdated', false);
                }
            );
        },
        update: function () {
            var network, that = this;
            network = App.Network.create({
                name: this.get('name'),
                gateway: this.get('gateway'),
                netmask: this.get('netmask'),
                dns1: this.get('dns1'),
                dns2: this.get('dns2'),
                description: this.get('description'),
                datacenter: this.get('datacenter')
            });
            App.Network.update(
                this.get('network_gateway'),
                App.getNotNullAttrs(network)
            ).then(
                function success(response) {
                    that.set('status', { updated: true });
                },
                function failure(response) {
                    that.set('status', { updated: false });
                }
            );
        },
        remove: function () {
            this.transitionToRoute('network.delete', this.get('content'));
        }
    },

    formObserver: function () {
        this.set('formUpdated', true);
    }.observes('name', 'gateway', 'netmask',
        'dns1', 'dns2', 'description', 'datacenter'),

    deleteInProgress: function () {
        return this.get('controllers.application').get(
            'currentPath'
        ) === 'network.delete';
    }.property('controllers.application.currentPath')
});