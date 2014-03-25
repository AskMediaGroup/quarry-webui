/*global console, App, Em, $ */
App.AdvancedSearchController = Em.ObjectController.extend({
    content: {},
    needs: 'serp',
    searchTermsBinding: 'controllers.serp.searchTerms',
    // Default value for the 'sort' select element
    sortOrder: 'Ascending',
    submittedEmpty: false,
    numIps: 0,

    applicationTypeOptions: function () {
        return App.APPLICATION_TYPES;
    }.property('App.APPLICATION_TYPES.@each'),

    productionTypeOptions: function () {
        return App.PRODUCTION_TYPES;
    }.property('App.PRODUCTION_TYPES.@each'),

    businessUnitOptions: function () {
        return App.BUSINESS_UNITS;
    }.property('App.BUSINESS_UNITS.@each'),

    actions: {
        addIps: function () {
            var i;
            for (i = 0; i < this.get('numIps'); i += 1) {
                this.get('searchTerms.ips').pushObject(App.Ip.create());
            }
        },
        popIp: function () {
            this.get('searchTerms.ips').popObject();
            this.decrementProperty('numIps', 1);
        },
        submit: function () {
            var that = this;
            this.get('searchTerms').setProperties({
                asset: App.getNonEmptyAttrs(this.get('searchTerms.asset')),
                ips: App.getNonEmptyArrIndices(this.get('searchTerms.ips'))
            });
            this.transitionToRoute('serp.index');
            this.get('controllers.serp').find().then(
                function (response) {
                    that.transitionToRoute('serp.index', response);
                }
            );
        },
        reset: function () {
            // Reset any existing asset search attributes
            var assetProp;
            for (assetProp in App.assetSchema) {
                if (App.assetSchema.hasOwnProperty(assetProp)) {
                    this.get('searchTerms').set('asset.' + assetProp, '');
                }
            }
            this.get('searchTerms').setProperties({
                ips: [],
                limit: App.DEFAULT_SERP_PAGE,
                offset: App.DEFAULT_SERP_OFFSET,
                sort: App.DEFAULT_SERP_SORT,
                desc: App.DEFAULT_SERP_DESC
            });
        },
        goSerp: function () {
            this.get('searchTerms').setProperties({
                asset: App.getNonEmptyAttrs(this.get('searchTerms.asset')),
                ips: App.getNonEmptyArrIndices(this.get('searchTerms.ips'))
            });
            this.transitionToRoute('serp');
        }
    },

    assetFields: function () {
        var assetProp, arr = [];
        for (assetProp in App.assetSchema) {
            if (App.assetSchema.hasOwnProperty(assetProp)) {
                arr.push(assetProp);
            }
        }
        return arr;
    }.property('App.assetSchema'),

    sortOrderOptions: [
        Em.Object.create({label: 'Ascending', value: false}),
        Em.Object.create({label: 'Descending', value: true})
    ],
    vmOptions: [
        Em.Object.create({label: '', value: ''}),
        Em.Object.create({label: 'is a VM', value: 1}),
        Em.Object.create({label: 'is not a VM', value: 0})
    ],
    linuxOptions: [
        Em.Object.create({label: '', value: ''}),
        Em.Object.create({label: 'is a Linux host', value: 1}),
        Em.Object.create({label: 'is not a Linux host', value: 0})
    ],
    windowsOptions: [
        Em.Object.create({label: '', value: ''}),
        Em.Object.create({label: 'is a Windows host', value: 1}),
        Em.Object.create({label: 'is not a Windows host', value: 0})
    ],
    swRaidOptions: [
        Em.Object.create({label: '', value: ''}),
        Em.Object.create({label: 'configured for software RAID', value: 1}),
        Em.Object.create({label: 'not configured for software RAID', value: 0})
    ]
});