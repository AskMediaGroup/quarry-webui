/*global App, Em */
App.AddPhysicalSpecsController = Em.ArrayController.extend({
    content: [],
    needs: ['addPhysical', 'networks', 'mortarBulk'],
    networksBinding: 'controllers.networks.content',
    showTemplateBinding: 'controllers.addPhysical.showTemplate',

    // values for select elements
    prodTypeOptions: function () {
        return App.PRODUCTION_TYPES;
    }.property('App.PRODUCTION_TYPES.@each'),

    applicationTypeOptions: function () {
        return App.APPLICATION_TYPES;
    }.property('App.APPLICATION_TYPES.@each'),

    businessUnitOptions: function () {
        return App.BUSINESS_UNITS;
    }.property('App.BUSINESS_UNITS.@each'),

    actions: {
        editInputTemplate: function () {
            this.set('showTemplate', true);
            this.set('fqdnsChecked', 0);
            this.reconcileTemplateFields();
            this.transitionToRoute('addPhysical');
            this.get('content').forEach(function(item, index, enumerable) {
                item.setProperties({
                    selectApplication: false,
                    selectProdType: false,
                    selectBU: false
                });
            });
        },
        cancel: function () {
            this.set('content', []);
            this.transitionToRoute('index');
        },
        prepBulk: function () {
            var mortarBulkRequest, that = this, assetsArray = [], fqdn;
            //Build the assets array
            this.get('content').forEach(function (item, index, enumerable) {
                fqdn = item.hostname + App.DOMAIN_SUFFIX;
                assetsArray.push(App.getNotNullAttrs(App.Assets.create({
                    FQDN: fqdn,
                    Service_Tag: item.assetTag,
                    ProdType: item.prodType || '',
                    Owner_Email: item.ownerEmail || '',
                    Business_Unit: item.businessUnit || '',
                    Application: item.application || '',
                    Owning_Group: item.ownerGroup || '',
                    MAC: item.mac || '',
                    SW_RAID: App.boolToInt(item.swRaid),
                    DC: that.get('network.datacenter') || null
                })));
            });
            mortarBulkRequest = Em.Object.create({
                args: assetsArray,
                network: App.getNotNullAttrs(App.Networks.create({
                    network_id: this.get('network.network_id'),
                    gateway: this.get('network.gateway')
                }))
            });
            if (this.get('lomNetwork.gateway')) {
                mortarBulkRequest.lom_network = App.getNotNullAttrs(
                    App.Networks.create({
                        network_id: this.get('lomNetwork.network_id'),
                        gateway: this.get('lomNetwork.gateway')
                    })
                );
            }
            // Passing an undefined variable as the 2nd arg because there's no
            // dynamic route segment for add_physical
            this.get('controllers.mortarBulk').prepBulk(
                '/asset/add_physical',
                undefined,
                mortarBulkRequest
            ).then(
                function success(response) {
                    that.set('content', []);
                    that.transitionToRoute('mortarBulk', response);
                }
            );
        },
        validateRequest: function () {
            this.checkFqdnAvailability();
        }
    },

    numHosts: function () {
        return this.get('content').length;
    }.property('content'),

    network: function () {
        return App.getNotNullAttrs(this.get('networks').findBy(
            'gateway',
            this.get('controllers.addPhysical.hostNetwork')
        ));
    }.property('controllers.addPhysical.hostNetwork'),

    lomNetwork: function () {
        return App.getNotNullAttrs(this.get('networks').findBy(
            'gateway',
            this.get('controllers.addPhysical.lomNetwork')
        ));
    }.property('controllers.addPhysical.lomNetwork'),

    friendlyHostNetwork: function () {
        return this.friendlyNetwork(this.get('network'));
    }.property('network'),

    friendlyLomNetwork: function () {
        return this.friendlyNetwork(this.get('lomNetwork'));
    }.property('lomNetwork'),

    friendlyNetwork: function (network) {
        return network.gateway + '/' +
            App.netmaskToCidr(network.netmask) +
            (network.name ?
                    (' (' + network.name + ')') :
                    '');
    },

    reconcileTemplateFields: function () {
        /***
         * Checks each field property for uniqueness across the hosts array
         * If there are distinct values for a single field, we want to ensure
         * that the corresponding template field is empty.  The template view
         * itself will ensure that the user is aware that changing the template
         * value will overwrite the various distinct values to the template
         * value.
         */
        // The hostname field
        if (!this.get('content').everyProperty(
                'hostname',
                this.get('content')[0].hostname
            )) {
            this.get('controllers.addPhysical').set('hostnamePrefix', null);
        } else {
            this.get('controllers.addPhysical').set(
                'hostname',
                this.get('content')[0].hostname
            );
        }
        // The swRaid field
        if (!this.get('content').everyProperty(
                'swRaid',
                this.get('content')[0].swRaid
            )) {
            this.get('controllers.addPhysical').set('swRaid', null);
        } else {
            this.get('controllers.addPhysical').set(
                'swRaid',
                this.get('content')[0].swRaid
            );
        }
        // The application field
        if (!this.get('content').everyProperty(
                'application',
                this.get('content')[0].application
            )) {
            this.get('controllers.addPhysical').set('application', null);
        } else {
            this.get('controllers.addPhysical').set(
                'application',
                this.get('content')[0].application
            );
        }
        // The prodType field
        if (!this.get('content').everyProperty(
                'prodType',
                this.get('content')[0].prodType
            )) {
            this.get('controllers.addPhysical').set('prodType', null);
        } else {
            this.get('controllers.addPhysical').set(
                'prodType',
                this.get('content')[0].prodType
            );
        }
        // The businessUnit field
        if (!this.get('content').everyProperty(
                'businessUnit',
                this.get('content')[0].businessUnit
            )) {
            this.get('controllers.addPhysical').set('businessUnit', null);
        } else {
            this.get('controllers.addPhysical').set(
                'businessUnit',
                this.get('content')[0].businessUnit
            );
        }
        // The ownerEmail field
        if (!this.get('content').everyProperty(
                'ownerEmail',
                this.get('content')[0].ownerEmail
            )) {
            this.get('controllers.addPhysical').set('ownerEmail', null);
        } else {
            this.get('controllers.addPhysical').set(
                'ownerEmail',
                this.get('content')[0].ownerEmail
            );
        }
        // The ownerGroup field
        if (!this.get('content').everyProperty(
                'ownerGroup',
                this.get('content')[0].ownerGroup
            )) {
            this.get('controllers.addPhysical').set('ownerGroup', null);
        } else {
            this.get('controllers.addPhysical').set(
                'ownerGroup',
                this.get('content')[0].ownerGroup
            );
        }
    },

    requestErrors: function () {
        return (this.get('duplicateHostnames') || this.get('duplicateMacs'));
    }.property('duplicateHostnames', 'duplicateMacs'),

    duplicateHostnames: function () {
        var hostnames = [];
        if (this.get('content').length > 1) {
            return this.get('content').some(function (item, index, enumerable) {
                if (hostnames.contains(item.hostname)) {
                    return true;
                }
                hostnames.push(item.hostname);
            });
        }
        return false;
    }.property('content.@each.hostname'),

    duplicateMacs: function () {
        var macs = [];
        if (this.get('content').length > 1) {
            return this.get('content').some(function (item, index, enumerable) {
                if (item.mac) {
                    if (macs.contains(item.mac)) {
                        return true;
                    }
                    macs.push(item.mac);
                }
            });
        }
        return false;
    }.property('content.@each.mac'),

    checkFqdnAvailability: function () {
        var content, that;
        content = this.get('content');
        this.set('nonAvailFqdns', []);
        this.set('fqdnsChecked', 0);
        that = this;
        content.forEach(function (item) {
            var queryObj = {
                where: {
                    FQDN: '^' + item.hostname + App.DOMAIN_SUFFIX
                }
            };
            App.Assets.find(queryObj).then(
                function (data) {
                    // A total of > 0 means the FQDN already exists
                    if (data.total > 0) {
                        that.get('nonAvailFqdns').pushObject(
                                item.hostname + App.DOMAIN_SUFFIX
                        );
                        that.incrementProperty('fqdnsChecked', 1);
                    } else if (data.total === 0) {
                        // a total of zero means that the FQDN is available
                        that.incrementProperty('fqdnsChecked', 1);
                    }
                }
            );
        });
    },

    validated: function () {
        return ((this.get('content').length === this.get('fqdnsChecked')) &&
            this.get('nonAvailFqdns').length < 1);
    }.property('content', 'fqdnsChecked', 'nonAvailFqdns.@each'),

    editSpecs: function () {
        this.set('fqdnsChecked', 0);
    }
});
