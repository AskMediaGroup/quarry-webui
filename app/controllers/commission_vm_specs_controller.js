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
        resetInputTemplate: function () {
            this.set('showTemplate', true);
            this.get('controllers.commissionVm').freshen();
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

    /*
     * Ensures that distinct vm attribute values are not overwritten by the
     * general-purpose vm template
     */
    protectDistinct: function (attr) {
        if (!this.get('content').everyProperty(
            attr,
            this.get('content')[0][attr]
        )) {
            this.get('controllers.commissionVm').set(attr, null);
        } else {
            this.get('controllers.commissionVm').set(
                attr,
                this.get('content')[0][attr]
            );
        }
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
        var vmAttrs, i;
        vmAttrs = ['pool', 'kickstart', 'ram', 'cores',
            'storage', 'layout', 'application', 'prodType', 'businessUnit',
            'ownerEmail', 'ownerGroup', 'chefRole'];
        for (i = 0; i < vmAttrs.length; i += 1) {
            this.protectDistinct(vmAttrs[i]);
        }
        // We deal with the hostname field a little differently
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