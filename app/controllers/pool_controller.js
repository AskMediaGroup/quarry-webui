/*global console, App, Quarry, Em, $ */
App.PoolController = Em.ObjectController.extend({
    content: {},
    needs: ['application', 'networks', 'pools'],
    networksBinding: 'controllers.networks.content',

    prodTypeOptions: function () {
        return App.PRODUCTION_TYPES;
    }.property('App.PRODUCTION_TYPES.@each'),

    businessUnitOptions: function () {
        return App.BUSINESS_UNITS;
    }.property('App.BUSINESS_UNITS.@each'),

    actions: {
        goPools: function () {
            this.get('controllers.pools').refresh();
            this.transitionToRoute('pools');
        },
        refresh: function () {
            var that = this;
            App.Pool.find(this.get('name')).then(
                function (pool, textStatus, jqXHR) {
                    that.get('controllers.networks').refresh();
                    // While we're storing exclusive value lists in memory
                    // as constant arrays we need to account for the fact that the db
                    // may have values that aren't in our arrays
                    if ($.inArray(pool.prodtype, App.PRODUCTION_TYPES) === -1) {
                        App.PRODUCTION_TYPES.pushObject(pool.prodtype);
                    }
                    if ($.inArray(pool.business_unit, App.BUSINESS_UNITS) === -1) {
                        App.BUSINESS_UNITS.pushObject(pool.business_unit);
                    }
                    that.setProperties({
                        content: pool,
                        newName: pool.name,
                        status: undefined
                    });
                    that.set('formUpdated', false);
                }
            );
        },
        update: function () {
            var pool, that = this;
            pool = App.Pool.create({
                name: this.get('newName'),
                dc: this.get('dc'),
                prodtype: this.get('prodtype'),
                business_unit: this.get('business_unit'),
                network: this.get('network')
            });
            App.Pool.update(
                this.get('name'),
                App.getNotNullAttrs(pool)
            ).then(
                function success(pool, textStatus, jqXHR) {
                    that.get('controllers.networks').refresh();
                    that.setProperties({
                        content: pool,
                        newName: pool.name
                    });
                    that.set('status', { updated: true });
                },
                function failure(jqXHR, textStatus, errorThrown) {
                    that.set('status', { updated: false });
                }
            );
        },
        remove: function () {
            this.transitionToRoute('pool.delete', this.get('content'));
        },
        getAsset: function (fqdn) {
            var that = this;
            if (fqdn) {
                App.Asset.find(fqdn).then(
                    function (asset) {
                        that.transitionToRoute('asset', asset);
                    }
                );
            }
        },
    },

    formObserver: function () {
        this.set('formUpdated', true);
    }.observes('newName', 'dc', 'prodtype', 'business_unit', 'network'),

    deleteInProgress: function () {
        return this.get('controllers.application').get(
            'currentPath'
        ) === 'pool.delete';
    }.property('controllers.application.currentPath')
});