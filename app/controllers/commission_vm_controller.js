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
            var modelArr = [], i, completeHostname = '', numSuffix;
            if (this.get('willAppendNumSeq')) {
                this.set('numHosts', this.get('numHostsAuto'));
            }
            for (i = 0; i < this.get('numHosts'); i += 1) {
                if (this.get('hostnamePrefix')) {
                    completeHostname = this.get('hostnamePrefix');
                    if (this.get('willAppendNumSeq')) {
                        numSuffix = String(parseInt(this.get('startNumSuffix'),
                            10) + i);
                        while (numSuffix.length < 3) {
                            numSuffix = "0" + numSuffix;
                        }
                        completeHostname += numSuffix;
                    }
                    if (this.get('willAppendDc')) {
                        completeHostname += this.get('dcSuffix');
                    }
                }
                if (this.get('controllers.commissionVmSpecs.content')[i]) {
                    if (completeHostname) {
                        this.get(
                            'controllers.commissionVmSpecs.content'
                        )[i].set('hostname', completeHostname);
                    }
                    if (this.get('pool')) {
                        this.get(
                            'controllers.commissionVmSpecs.content'
                        )[i].set('pool', this.get('pool'));
                    }
                    if (this.get('kickstart')) {
                        this.get(
                            'controllers.commissionVmSpecs.content'
                        )[i].set('kickstart', this.get('kickstart'));
                    }
                    if (this.get('ram')) {
                        this.get(
                            'controllers.commissionVmSpecs.content'
                        )[i].set('ram', this.get('ram'));
                    }
                    if (this.get('cores')) {
                        this.get(
                            'controllers.commissionVmSpecs.content'
                        )[i].set('cores', this.get('cores'));
                    }
                    if (this.get('storage')) {
                        this.get(
                            'controllers.commissionVmSpecs.content'
                        )[i].set('storage', this.get('storage'));
                    }
                    if (this.get('layout')) {
                        this.get(
                            'controllers.commissionVmSpecs.content'
                        )[i].set('layout', this.get('layout'));
                    }
                    if (this.get('application')) {
                        this.get(
                            'controllers.commissionVmSpecs.content'
                        )[i].set('application', this.get('application'));
                    }
                    if (this.get('prodType')) {
                        this.get(
                            'controllers.commissionVmSpecs.content'
                        )[i].set('prodType', this.get('prodType'));
                    }
                    if (this.get('businessUnit')) {
                        this.get(
                            'controllers.commissionVmSpecs.content'
                        )[i].set('businessUnit', this.get('businessUnit'));
                    }
                    if (this.get('ownerEmail')) {
                        this.get(
                            'controllers.commissionVmSpecs.content'
                        )[i].set('ownerEmail', this.get('ownerEmail'));
                    }
                    if (this.get('ownerGroup')) {
                        this.get(
                            'controllers.commissionVmSpecs.content'
                        )[i].set('ownerGroup', this.get('ownerGroup'));
                    }
                    if (this.get('chefRole')) {
                        this.get(
                            'controllers.commissionVmSpecs.content'
                        )[i].set('chefRole', this.get('chefRole'));
                    }
                    modelArr.pushObject(
                        this.get('controllers.commissionVmSpecs.content')[i]
                    );
                } else {
                    modelArr.pushObject(App.CommissionVmSpecs.create({
                        index: i + 1,
                        hostname: completeHostname,
                        pool: this.get('pool'),
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
        if (this.get('controllers.commissionVmSpecs.content')[0]) {
            return !this.get(
                'controllers.commissionVmSpecs.content'
            ).everyProperty(
                'hostname',
                this.get('controllers.commissionVmSpecs.content')[0].hostname
            );
        }
        return false;
    }.property('controllers.commissionVmSpecs.content.@each.hostname'),

    distinctPools: function () {
        if (this.get('controllers.commissionVmSpecs.content')[0]) {
            return !this.get(
                'controllers.commissionVmSpecs.content'
            ).everyProperty(
                'pool',
                this.get('controllers.commissionVmSpecs.content')[0].pool
            );
        }
        return false;
    }.property('controllers.commissionVmSpecs.content.@each.pool'),

    distinctKickstarts: function () {
        if (this.get('controllers.commissionVmSpecs.content')[0]) {
            return !this.get(
                'controllers.commissionVmSpecs.content'
            ).everyProperty(
                'kickstart',
                this.get('controllers.commissionVmSpecs.content')[0].kickstart
            );
        }
        return false;
    }.property('controllers.commissionVmSpecs.content.@each.kickstart'),

    distinctRam: function () {
        if (this.get('controllers.commissionVmSpecs.content')[0]) {
            return !this.get(
                'controllers.commissionVmSpecs.content'
            ).everyProperty(
                'ram',
                this.get('controllers.commissionVmSpecs.content')[0].ram
            );
        }
        return false;
    }.property('controllers.commissionVmSpecs.content.@each.ram'),

    distinctCores: function () {
        if (this.get('controllers.commissionVmSpecs.content')[0]) {
            return !this.get(
                'controllers.commissionVmSpecs.content'
            ).everyProperty(
                'cores',
                this.get('controllers.commissionVmSpecs.content')[0].cores
            );
        }
        return false;
    }.property('controllers.commissionVmSpecs.content.@each.cores'),

    distinctStorage: function () {
        if (this.get('controllers.commissionVmSpecs.content')[0]) {
            return !this.get(
                'controllers.commissionVmSpecs.content'
            ).everyProperty(
                'storage',
                this.get('controllers.commissionVmSpecs.content')[0].storage
            );
        }
        return false;
    }.property('controllers.commissionVmSpecs.content.@each.storage'),

    distinctLayouts: function () {
        if (this.get('controllers.commissionVmSpecs.content')[0]) {
            return !this.get(
                'controllers.commissionVmSpecs.content'
            ).everyProperty(
                'layout',
                this.get('controllers.commissionVmSpecs.content')[0].layout
            );
        }
        return false;
    }.property('controllers.commissionVmSpecs.content.@each.layout'),

    distinctApplications: function () {
        if (this.get('controllers.commissionVmSpecs.content')[0]) {
            return !this.get(
                'controllers.commissionVmSpecs.content'
            ).everyProperty(
                'application',
                this.get('controllers.commissionVmSpecs.content')[0].application
            );
        }
        return false;
    }.property('controllers.commissionVmSpecs.content.@each.application'),

    distinctProdTypes: function () {
        if (this.get('controllers.commissionVmSpecs.content')[0]) {
            return !this.get(
                'controllers.commissionVmSpecs.content'
            ).everyProperty(
                'prodType',
                this.get('controllers.commissionVmSpecs.content')[0].prodType
            );
        }
        return false;
    }.property('controllers.commissionVmSpecs.content.@each.prodType'),

    distinctBusinessUnits: function () {
        if (this.get('controllers.commissionVmSpecs.content')[0]) {
            return !this.get(
                'controllers.commissionVmSpecs.content'
            ).everyProperty(
                'businessUnit',
                this.get(
                    'controllers.commissionVmSpecs.content'
                )[0].businessUnit
            );
        }
        return false;
    }.property('controllers.commissionVmSpecs.content.@each.businessUnit'),

    distinctOwnerEmails: function () {
        if (this.get('controllers.commissionVmSpecs.content')[0]) {
            return !this.get(
                'controllers.commissionVmSpecs.content'
            ).everyProperty(
                'ownerEmail',
                this.get('controllers.commissionVmSpecs.content')[0].ownerEmail
            );
        }
        return false;
    }.property('controllers.commissionVmSpecs.content.@each.ownerEmail'),

    distinctOwnerGroups: function () {
        if (this.get('controllers.commissionVmSpecs.content')[0]) {
            return !this.get(
                'controllers.commissionVmSpecs.content'
            ).everyProperty(
                'ownerGroup',
                this.get('controllers.commissionVmSpecs.content')[0].ownerGroup
            );
        }
        return false;
    }.property('controllers.commissionVmSpecs.content.@each.ownerGroup'),

    distinctChefRoles: function () {
        if (this.get('controllers.commissionVmSpecs.content')[0]) {
            return !this.get(
                'controllers.commissionVmSpecs.content'
            ).everyProperty(
                'chefRole',
                this.get('controllers.commissionVmSpecs.content')[0].chefRole
            );
        }
        return false;
    }.property('controllers.commissionVmSpecs.content.@each.chefRole'),

    optionsReady: function () {
        return (
            this.get('layout') &&
            this.get('kickstart') &&
            this.get('hypervisor') ? true : false
        );
    }.property('layout', 'kickstart', 'hypervisor')
});