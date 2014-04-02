/*global App, Em */
App.NetworksNewController = Em.ObjectController.extend({
    content: {},

    actions: {
        add: function () {
            var that = this;
            this.setProperties({
                nameAlert: this.get('missingName'),
                gatewayAlert: this.get('missingGateway'),
                netmaskAlert: this.get('missingNetmask'),
                datacenterAlert: this.get('missingDatacenter'),
                dns1Alert: this.get('missingDns1'),
                descriptionAlert: this.get('missingDescription')
            });
            if (this.get('validated')) {
                this.setProperties({
                    nameAlert: null,
                    gatewayAlert: null,
                    netmaskAlert: null,
                    datacenterAlert: null,
                    dns1Alert: null,
                    descriptionAlert: null
                });
                App.Network.add(
                    App.getNotNullAttrs(this.get('content'))
                ).then(
                    function success(response) {
                        that.set('status', { added: true });
                    },
                    function failure(response) {
                        that.set('status', { added: false });
                    }
                );
            }
        },
        edit: function () {
            var that = this;
            App.Network.find(this.get('gateway')).then(
                function (response) {
                    that.transitionToRoute('network', response);
                }
            );
        },
        retry: function () {
            this.set('status', undefined);
        },
        cancel: function () {
            this.transitionToRoute('networks');
        }
    },

    missingName: function () {
        return this.get('name') ? false : true;
    }.property('name'),

    missingGateway: function () {
        return this.get('gateway') ? false : true;
    }.property('gateway'),

    missingNetmask: function () {
        return this.get('netmask') ? false : true;
    }.property('netmask'),

    missingDatacenter: function () {
        return this.get('datacenter') ? false : true;
    }.property('datacenter'),

    missingDns1: function () {
        return this.get('dns1') ? false : true;
    }.property('dns1'),

    missingDescription: function () {
        return this.get('description') ? false : true;
    }.property('description'),

    validated: function () {
        return (!this.get('missingName') &&
            !this.get('missingGateway') &&
            !this.get('missingNetmask') &&
            !this.get('missingDatacenter') &&
            !this.get('missingDns1') &&
            !this.get('missingDescription'));
    }.property('missingName', 'missingGateway', 'missingNetmask',
        'missingDatacenter', 'missingDns1', 'missingDescription')
});


