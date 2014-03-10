/*global console, App, Em, $ */
App.CommissionVmSpecsController = Em.ArrayController.extend({
    content: [],
    needs: ['commissionVm', 'kickstarts', 'layouts', 'blade', 'pools'],
    showTemplateBinding: 'controllers.commissionVm.showTemplate',
    kickstartsBinding: 'controllers.kickstarts.content',
    layoutsBinding: 'controllers.layouts.content',
    rolesBinding: 'controllers.blade.roles',
    poolsBinding: 'controllers.pools.content',

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

    domainSuffix: function () {
        return App.DOMAIN_SUFFIX;
    }.property('App.DOMAIN_SUFFIX'),

    nonAvailFqdns: [],

    actions: {
        editSpecs: function () {
            this.set('fqdnsChecked', 0);
        },
        submitCommission: function () {
            var that = this;
            this.get('content').forEach(function (item, index, enumerable) {
                var fqdn, asset, kickstart, vm, layout, role;

                fqdn = item.hostname + App.DOMAIN_SUFFIX;

                asset = App.Asset.create({
                    FQDN: fqdn,
                    ProdType: item.prodType || '',
                    Owner_Email: item.ownerEmail || '',
                    Owning_Group: item.ownerGroup || '',
                    Application: item.application || '',
                    Business_Unit: item.businessUnit || ''
                });

                kickstart = App.Kickstart.create({
                    id: that.get('kickstarts').findBy('name', item.kickstart).id
                });

                vm = App.Vm.create({
                    name: fqdn,
                    hypervisor: item.hypervisor,
                    memory: parseInt(item.ram, 10),
                    capacity: parseInt(item.storage, 10),
                    cpus: parseInt(item.cores, 10)
                });

                layout = App.Layout.create({
                    partlayout_id:
                        that.get('layouts').findBy(
                            'name',
                            item.layout
                        ).partlayout_id
                });

                role = item.chefRole || undefined;

                App.Mortar.commission(asset, kickstart, vm, layout, role).then(
                    function (response) {
                        return App.Job.create(response);
                    }
                );
            });
            this.setProperties({
                nonAvailFqdns: [],
                fqdnsChecked: undefined,
                hypervisorsReserved: undefined
            });
            this.transitionToRoute('jobs');
        },
        editInputTemplate: function () {
            this.set('showTemplate', true);
            this.set('fqdnsChecked', 0);
            this.get('controllers.commissionVm').set(
                'numHosts',
                this.get('numHosts')
            );
            this.reconcileTemplateFields();
            this.transitionToRoute('commissionVm');
        },
        cancel: function () {
            this.setProperties({
                nonAvailFqdns: [],
                fqdnsChecked: undefined,
                hypervisorsReserved: undefined
            });
            this.transitionToRoute('index');
        },
        validateRequest: function () {
            if (!this.get('hostnameErrors') && !this.get('missingPools') &&
                    !this.get('missingOs') && !this.get('missingLayouts')) {
                this.reserveHypervisors();
                this.checkFqdnAvailability();
            }
            this.setProperties({
                poolAlert: this.get('missingPools'),
                osAlert: this.get('missingOs'),
                layoutAlert: this.get('missingLayouts')
            });
        }
    },

    numHosts: function () {
        return this.get('content').length;
    }.property('content'),

    kickstartsDict: function () {
        var dict = {};
        if (this.get('kickstarts')) {
            this.get('kickstarts').forEach(function (item, index, enumerable) {
                dict[item.name] = item.id;
            });
        }
        return dict;
    }.property('kickstarts'),

    layoutsDict: function () {
        var dict = {};
        if (this.get('layouts')) {
            this.get('layouts').forEach(function (item, index, enumerable) {
                dict[item.name] = item.partlayout_id;
            });
        }
        return dict;
    }.property('layouts'),

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
        if (!this.get('controllers.commissionVm').get('willAppendNumSeq')) {
            if (!this.get('content').everyProperty(
                    'hostname',
                    this.get('content')[0].hostname
                )) {
                this.get('controllers.commissionVm').set('hostnamePrefix', null);
            } else {
                this.get('controllers.commissionVm').set(
                    'hostnamePrefix',
                    this.get('content')[0].hostname
                );
            }
        }
        // The pools field
        if (!this.get('content').everyProperty(
                'pool',
                this.get('content')[0].pool
            )) {
            this.get('controllers.commissionVm').set('pool', null);
        } else {
            this.get('controllers.commissionVm').set(
                'pool',
                this.get('content')[0].pool
            );
        }
        // The kickstart (OS) field
        if (!this.get('content').everyProperty(
                'kickstart',
                this.get('content')[0].kickstart
            )) {
            this.get('controllers.commissionVm').set('kickstart', null);
        } else {
            this.get('controllers.commissionVm').set(
                'kickstart',
                this.get('content')[0].kickstart
            );
        }
        // The ram field
        if (!this.get('content').everyProperty(
                'ram',
                this.get('content')[0].ram
            )) {
            this.get('controllers.commissionVm').set('ram', null);
        } else {
            this.get('controllers.commissionVm').set(
                'ram',
                this.get('content')[0].ram
            );
        }
        // The cores field
        if (!this.get('content').everyProperty(
                'cores',
                this.get('content')[0].cores
            )) {
            this.get('controllers.commissionVm').set('cores', null);
        } else {
            this.get('controllers.commissionVm').set(
                'cores',
                this.get('content')[0].cores
            );
        }
        // The storage field
        if (!this.get('content').everyProperty(
                'storage',
                this.get('content')[0].storage
            )) {
            this.get('controllers.commissionVm').set('storage', null);
        } else {
            this.get('controllers.commissionVm').set(
                'storage',
                this.get('content')[0].storage
            );
        }
        // The layout field
        if (!this.get('content').everyProperty(
                'layout',
                this.get('content')[0].layout
            )) {
            this.get('controllers.commissionVm').set('layout', null);
        } else {
            this.get('controllers.commissionVm').set(
                'layout',
                this.get('content')[0].layout
            );
        }
        // The application field
        if (!this.get('content').everyProperty(
                'application',
                this.get('content')[0].application
            )) {
            this.get('controllers.commissionVm').set('application', null);
        } else {
            this.get('controllers.commissionVm').set(
                'application',
                this.get('content')[0].application
            );
        }
        // The prodType field
        if (!this.get('content').everyProperty(
                'prodType',
                this.get('content')[0].prodType
            )) {
            this.get('controllers.commissionVm').set('prodType', null);
        } else {
            this.get('controllers.commissionVm').set(
                'prodType',
                this.get('content')[0].prodType
            );
        }
        // The businessUnit field
        if (!this.get('content').everyProperty(
                'businessUnit',
                this.get('content')[0].businessUnit
            )) {
            this.get('controllers.commissionVm').set('businessUnit', null);
        } else {
            this.get('controllers.commissionVm').set(
                'businessUnit',
                this.get('content')[0].businessUnit
            );
        }
        // The ownerEmail field
        if (!this.get('content').everyProperty(
                'ownerEmail',
                this.get('content')[0].ownerEmail
            )) {
            this.get('controllers.commissionVm').set('ownerEmail', null);
        } else {
            this.get('controllers.commissionVm').set(
                'ownerEmail',
                this.get('content')[0].ownerEmail
            );
        }
        // The ownerGroup field
        if (!this.get('content').everyProperty(
                'ownerGroup',
                this.get('content')[0].ownerGroup
            )) {
            this.get('controllers.commissionVm').set('ownerGroup', null);
        } else {
            this.get('controllers.commissionVm').set(
                'ownerGroup',
                this.get('content')[0].ownerGroup
            );
        }
        // The chefRole field
        if (!this.get('content').everyProperty(
            'chefRole',
            this.get('content')[0].chefRole
        )) {
            this.get('controllers.commissionVm').set('chefRole', null);
        } else {
            this.get('controllers.commissionVm').set(
                'chefRole',
                this.get('content')[0].chefRole
            );
        }
    },

    hostnameErrors: function () {
        return (this.get('duplicateHostnames') &&
            this.get('missingHostnames'));
    }.property('duplicateHostnames', 'missingHostnames'),

    duplicateHostnames: function () {
        var content, hostnames = [], i;
        content = this.get('content');
        if (content.length > 1) {
            content.forEach(function (item, index, enumerable) {
                hostnames.push(item.hostname);
            });
            // js sort method changes the array that calls it
            hostnames.sort();
            for (i = 0; i < hostnames.length - 1; i += 1) {
                if (hostnames[i] === hostnames[i + 1]) {
                    return true;
                }
            }
            return false;
        }
        return false;
    }.property('content.@each.hostname'),

    missingHostnames: function () {
        return this.get('content').someProperty('hostname', undefined);
    }.property('content.@each.hostname'),

    missingPools: function () {
        return this.get('content').someProperty('pool', null);
    }.property('content.@each.pool'),

    noHypervisor: function () {
        return this.get('content').someProperty('hypervisor', null);
    }.property('content.@each.hypervisor'),

    hypervisorsNotFound: function () {
        return this.get('content').someProperty('hypervisorNotFound', true);
    }.property('content.@each.hypervisorNotFound'),

    missingOs: function () {
        return this.get('content').someProperty('kickstart', null);
    }.property('content.@each.kickstart'),

    missingLayouts: function () {
        return this.get('content').someProperty('layout', null);
    }.property('content.@each.layout'),

    checkFqdnAvailability: function () {
        var content, that;
        content = this.get('content');
        this.set('nonAvailFqdns', []);
        this.set('fqdnsChecked', 0);
        that = this;
        content.forEach(function (item) {
            App.Asset.find(item.hostname + App.DOMAIN_SUFFIX).then(
                function success(response) {
                    // A response means the FQDN already exists
                    that.get('nonAvailFqdns').pushObject(
                        item.hostname + App.DOMAIN_SUFFIX
                    );
                    that.set('fqdnsChecked', that.get('fqdnsChecked') + 1);
                },
                function failure(response) {
                    // A 404 means that the FQDN is available
                    that.set('fqdnsChecked', that.get('fqdnsChecked') + 1);
                }
            );
        });
    },

    reserveHypervisors: function () {
        var that = this;
        this.set('hypervisorsReserved', 0);
        this.get('content').forEach(function (item, index, enumerable) {
            App.Pool.get_hypervisors(item.get('pool')).then(
                function success(data, textStatus, jqXHR) {
                    var hypervisors = [];
                    $.each(data, function (i, hypervisor) {
                        hypervisors.pushObject(
                            App.Hypervisor.create(hypervisor)
                        );
                    });
                    item.set('hypervisors', hypervisors);
                }
            );
            if (!item.get('hypervisor')) {
                App.Hypervisor.schedule({
                    name: item.hostname + App.DOMAIN_SUFFIX,
                    memory: Number(item.ram),
                    capacity: Number(item.storage),
                    cpus: Number(item.cores)
                }, item.get('pool'), item.get('clusterPrefix'), true).then(
                    function success(hypervisors) {
                        if (hypervisors.length > 0) {
                            item.setProperties({
                                reservations: hypervisors,
                                hypervisor: hypervisors[0].name,
                                hypervisorNotFound: false
                            });
                            that.incrementProperty('hypervisorsReserved', 1);
                        } else {
                            item.setProperties({
                                reservations: [],
                                hypervisor: null,
                                hypervisorNotFound: true
                            });
                        }
                    },
                    function failure(jqXHR, textStatus, errorThrown) {
                        console.log(jqXHR);
                    }
                );
            } else {
                that.incrementProperty('hypervisorsReserved', 1);
            }
        });
    },

    validated: function () {
        return ((this.get('content').length === this.get('fqdnsChecked')) &&
            this.get('content').length === this.get('hypervisorsReserved') &&
            this.get('nonAvailFqdns').length < 1 &&
            !this.get('noHypervisor') &&
            !this.get('missingOs') &&
            !this.get('missingLayouts') &&
            !this.get('hypervisorAlert') &&
            !this.get('osAlert') &&
            !this.get('layoutAlert'));
    }.property('content', 'fqdnsChecked', 'nonAvailFqdns.@each',
        'noHypervisor', 'missingOs', 'missingLayouts', 'hypervisorsReserved')
});