/*global App, Em */
App.AddPhysicalController = Em.ObjectController.extend({
    content: {},
    needs: ['networks', 'addPhysicalSpecs'],
    networksBinding: 'controllers.networks.content',

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

    actions: {
        buildHostSpecs: function () {
            var modelArr = [], i, completeHostname = '', numSuffix;
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
                if (this.get('controllers.addPhysicalSpecs.content')[i]) {
                    this.get('controllers.addPhysicalSpecs.content')[i].set(
                        'assetTag',
                        this.get('assetTagArray')[i]
                    );
                    if (completeHostname) {
                        this.get(
                            'controllers.addPhysicalSpecs.content'
                        )[i].set('hostname', completeHostname);
                    }
                    if (this.get('swRaid')) {
                        this.get(
                            'controllers.addPhysicalSpecs.content'
                        )[i].set('swRaid', this.get('swRaid'));
                    }
                    if (this.get('application')) {
                        this.get(
                            'controllers.addPhysicalSpecs.content'
                        )[i].set('application', this.get('application'));
                    }
                    if (this.get('prodType')) {
                        this.get(
                            'controllers.addPhysicalSpecs.content'
                        )[i].set('prodType', this.get('prodType'));
                    }
                    if (this.get('businessUnit')) {
                        this.get(
                            'controllers.addPhysicalSpecs.content'
                        )[i].set('businessUnit', this.get('businessUnit'));
                    }
                    if (this.get('ownerEmail')) {
                        this.get(
                            'controllers.addPhysicalSpecs.content'
                        )[i].set('ownerEmail', this.get('ownerEmail'));
                    }
                    if (this.get('ownerGroup')) {
                        this.get(
                            'controllers.addPhysicalSpecs.content'
                        )[i].set('ownerGroup', this.get('ownerGroup'));
                    }
                    modelArr.pushObject(
                        this.get('controllers.addPhysicalSpecs.content')[i]
                    );
                } else {
                    modelArr.pushObject(App.AddPhysicalSpecs.create({
                        assetTag: this.get('assetTagArray')[i],
                        hostname: completeHostname,
                        swRaid: this.get('swRaid'),
                        application: this.get('application'),
                        prodType: this.get('prodType'),
                        businessUnit: this.get('businessUnit'),
                        ownerEmail: this.get('ownerEmail'),
                        ownerGroup: this.get('ownerGroup')
                    }));
                }
            }
            this.transitionToRoute('addPhysical.specs', modelArr);
        }
    },

    numHosts: function () {
        return this.get('assetTags') ?
                this.get('assetTags').split("\n").length :
                0;
    }.property('assetTags'),

    ready: function () {
        return this.get('numHosts') > 0 && this.get('hostNetwork') !== null;
    }.property('numHosts', 'hostNetwork'),

    assetTagArray: function () {
        return this.get('assetTags') ?
                this.get('assetTags').split("\n") :
                [];
    }.property('assetTags'),

    distinctHostnames: function () {
        if (this.get('controllers.addPhysicalSpecs.content')[0]) {
            return !this.get(
                'controllers.addPhysicalSpecs.content'
            ).everyProperty(
                'hostname',
                this.get('controllers.addPhysicalSpecs.content')[0].hostname
            );
        }
        return false;
    }.property('controllers.addPhysicalSpecs.content.@each.hostname'),

    distinctSwRaid: function () {
        if (this.get('controllers.addPhysicalSpecs.content')[0]) {
            return !this.get(
                'controllers.addPhysicalSpecs.content'
            ).everyProperty(
                'swRaid',
                this.get('controllers.addPhysicalSpecs.content')[0].swRaid
            );
        }
        return false;
    }.property('controllers.addPhysicalSpecs.content.@each.swRaid'),


    distinctApplications: function () {
        if (this.get('controllers.addPhysicalSpecs.content')[0]) {
            return !this.get(
                'controllers.addPhysicalSpecs.content'
            ).everyProperty(
                'application',
                this.get('controllers.addPhysicalSpecs.content')[0].application
            );
        }
        return false;
    }.property('controllers.addPhysicalSpecs.content.@each.application'),

    distinctProdTypes: function () {
        if (this.get('controllers.addPhysicalSpecs.content')[0]) {
            return !this.get(
                'controllers.addPhysicalSpecs.content'
            ).everyProperty(
                'prodType',
                this.get('controllers.addPhysicalSpecs.content')[0].prodType
            );
        }
        return false;
    }.property('controllers.addPhysicalSpecs.content.@each.prodType'),

    distinctBusinessUnits: function () {
        if (this.get('controllers.addPhysicalSpecs.content')[0]) {
            return !this.get(
                'controllers.addPhysicalSpecs.content'
            ).everyProperty(
                'businessUnit',
                this.get(
                    'controllers.addPhysicalSpecs.content'
                )[0].businessUnit
            );
        }
        return false;
    }.property('controllers.addPhysicalSpecs.content.@each.businessUnit'),

    distinctOwnerEmails: function () {
        if (this.get('controllers.addPhysicalSpecs.content')[0]) {
            return !this.get(
                'controllers.addPhysicalSpecs.content'
            ).everyProperty(
                'ownerEmail',
                this.get('controllers.addPhysicalSpecs.content')[0].ownerEmail
            );
        }
        return false;
    }.property('controllers.addPhysicalSpecs.content.@each.ownerEmail'),

    distinctOwnerGroups: function () {
        if (this.get('controllers.addPhysicalSpecs.content')[0]) {
            return !this.get(
                'controllers.addPhysicalSpecs.content'
            ).everyProperty(
                'ownerGroup',
                this.get('controllers.addPhysicalSpecs.content')[0].ownerGroup
            );
        }
        return false;
    }.property('controllers.addPhysicalSpecs.content.@each.ownerGroup')
});
