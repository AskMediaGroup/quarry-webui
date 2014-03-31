/*global console, App, Em, $ */
App.CommissionVmController = Em.ObjectController.extend({
    content: {},
    needs: ['kickstarts', 'layouts', 'commissionVmSpecs', 'blade', 'pools'],
    poolsBinding: 'controllers.pools.content',
    kickstartsBinding: 'controllers.kickstarts.content',
    layoutsBinding: 'controllers.layouts.content',
    rolesBinding: 'controllers.blade.roles',

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

    dcOptions: function () {
        return App.DC_CODES;
    }.property('App.DC_CODES.@each'),

    // default values
    domainSuffix: function () {
        return App.DOMAIN_SUFFIX;
    }.property('App.DOMAIN_SUFFIX'),

    ram: function () {
        return App.DEFAULT_RAM_XEN;
    }.property('App.DEFAULT_RAM_XEN'),

    cores: function () {
        return App.DEFAULT_CPU_CORES_XEN;
    }.property('App.DEFAULT_CPU_CORES_XEN'),

    storage: function () {
        return App.DEFAULT_STORAGE_XEN;
    }.property('App.DEFAULT_STORAGE_XEN'),

    actions: {
        buildHostSpecs: function () {
            var modelArr = [], i, hostname = '', numSuffix, j, vmAttrs;
            if (this.get('willAppendNumSeq')) {
                this.set('numHosts', this.get('numHostsAuto'));
            }
            for (i = 0; i < this.get('numHosts'); i += 1) {
                if (this.get('hostnamePrefix')) {
                    hostname = this.get('hostnamePrefix');
                    if (this.get('willAppendNumSeq')) {
                        numSuffix = String(parseInt(this.get('startNumSuffix'),
                            10) + i);
                        while (numSuffix.length < 3) {
                            numSuffix = "0" + numSuffix;
                        }
                        hostname += numSuffix;
                    }
                    if (this.get('willAppendDc')) {
                        hostname += this.get('dcSuffix');
                    }
                    if (hostname) {
                        this.set('hostname', hostname);
                    }
                }
                if (this.get('controllers.commissionVmSpecs.content')[i]) {
                    vmAttrs = ['hostname', 'pool', 'kickstart', 'ram', 'cores',
                        'storage', 'layout', 'application', 'prodType', 'businessUnit',
                        'ownerEmail', 'ownerGroup', 'chefRole'];
                    for (j = 0; j < vmAttrs.length; j += 1) {
                        if (this.get(vmAttrs[j])) {
                            this.get(
                                'controllers.commissionVmSpecs.content'
                            )[i].set(vmAttrs[j], this.get(vmAttrs[j]));
                        }
                    }
                    modelArr.pushObject(
                        this.get('controllers.commissionVmSpecs.content')[i]
                    );
                } else {
                    modelArr.pushObject(App.CommissionVmHostSpecs.create({
                        index: i + 1,
                        hostname: this.get('hostname'),
                        pool: this.get('pool'),
                        poolArr: [this.get('pool')],
                        kickstart: this.get('kickstart'),
                        ram: this.get('ram'),
                        cores: this.get('cores'),
                        storage: this.get('storage'),
                        layout: this.get('layout'),
                        application: this.get('application'),
                        prodType: this.get('prodType'),
                        businessUnit: this.get('businessUnit'),
                        ownerEmail: this.get('ownerEmail'),
                        ownerGroup: this.get('ownerGroup'),
                        chefRole: this.get('chefRole')
                    }));
                }
            }
            this.transitionToRoute('commissionVm.specs', modelArr);
        }
    },

    freshen: function () {
        this.get('controllers.commissionVmSpecs').set('content', []);
        this.setProperties({
            numHosts: null,
            startNumSuffix: undefined,
            endNumSuffix: undefined,
            willAppendNumSeq: undefined
        });
    },

    isDistinct: function (attr) {
        if (this.get('controllers.commissionVmSpecs.content')[0]) {
            return !this.get(
                'controllers.commissionVmSpecs.content'
            ).everyProperty(
                attr,
                this.get('controllers.commissionVmSpecs.content')[0][attr]
            );
        }
        return false;
    },

    numHostsAuto: function () {
        var totalNum = parseInt(this.get('endNumSuffix') -
            this.get('startNumSuffix'), 10) + 1;
        if (isNaN(totalNum)) {
            return 0;
        }
        if (totalNum < 0) {
            return 0;
        }
        return totalNum;
    }.property('startNumSuffix', 'endNumSuffix'),

    hypervisorsReserved: function () {
        return this.get(
            'controllers.commissionVmSpecs.hypervisorsReserved'
        ) > 0;
    }.property('controllers.commissionVmSpecs.hypervisorsReserved'),

    distinctHostnames: function () {
        return this.isDistinct('hostname');
    }.property('controllers.commissionVmSpecs.content.@each.hostname'),

    distinctPools: function () {
        return this.isDistinct('pool');
    }.property('controllers.commissionVmSpecs.content.@each.pool'),

    distinctKickstarts: function () {
        return this.isDistinct('kickstart');
    }.property('controllers.commissionVmSpecs.content.@each.kickstart'),

    distinctRam: function () {
        return this.isDistinct('ram');
    }.property('controllers.commissionVmSpecs.content.@each.ram'),

    distinctCores: function () {
        return this.isDistinct('cores');
    }.property('controllers.commissionVmSpecs.content.@each.cores'),

    distinctStorage: function () {
        return this.isDistinct('storage');
    }.property('controllers.commissionVmSpecs.content.@each.storage'),

    distinctLayouts: function () {
        return this.isDistinct('layout');
    }.property('controllers.commissionVmSpecs.content.@each.layout'),

    distinctApplications: function () {
        return this.isDistinct('application');
    }.property('controllers.commissionVmSpecs.content.@each.application'),

    distinctProdTypes: function () {
        return this.isDistinct('prodType');
    }.property('controllers.commissionVmSpecs.content.@each.prodType'),

    distinctBusinessUnits: function () {
        return this.isDistinct('businessUnit');
    }.property('controllers.commissionVmSpecs.content.@each.businessUnit'),

    distinctOwnerEmails: function () {
        return this.isDistinct('ownerEmail');
    }.property('controllers.commissionVmSpecs.content.@each.ownerEmail'),

    distinctOwnerGroups: function () {
        return this.isDistinct('ownerGroup');
    }.property('controllers.commissionVmSpecs.content.@each.ownerGroup'),

    distinctChefRoles: function () {
        return this.isDistinct('chefRole');
    }.property('controllers.commissionVmSpecs.content.@each.chefRole'),

    optionsReady: function () {
        return (
            this.get('layout') &&
            this.get('kickstart') &&
            this.get('hypervisor') ? true : false
        );
    }.property('layout', 'kickstart', 'hypervisor'),

    /**
     * As long as we're asking the user to endure this blocking effects
     * of rendering the commissionVmSpecs template, we may as well give
     * them an expectation of how long they'll be waiting
     * @type {ComputedProperty}
     */
    timeToBuild: function () {
        return this.get('numHosts') ? +this.get('numHosts') * 0.7 : undefined;
    }.property('numHosts')
});