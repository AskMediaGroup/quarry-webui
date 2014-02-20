/*global console, App, Quarry, Em, $ */
App.PoolsNewController = Em.ObjectController.extend({
    content: {},
    needs: ['networks'],
    networksBinding: 'controllers.networks.content',

    prodTypeOptions: function () {
        return App.PRODUCTION_TYPES;
    }.property('App.PRODUCTION_TYPES.@each'),

    businessUnitOptions: function () {
        return App.BUSINESS_UNITS;
    }.property('App.BUSINESS_UNITS.@each'),

    actions: {
        add: function () {
            var that = this;
            this.setProperties({
                nameAlert: this.get('missingName')
            });
            if (this.get('validated')) {
                this.setProperties({
                    nameAlert: null
                });
                App.Pool.add(
                    App.Pool.create({
                        name: this.get('name'),
                        dc: this.get('dc') || '',
                        business_unit: this.get('business_unit') || '',
                        prodtype: this.get('prodtype') || '',
                        network: this.get('network') || '',
                        type: 'xen',
                        enabled: true
                    })
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
            App.Pool.find(this.get('name')).then(
                function success(pool, textStatus, jqXHR) {
                    that.transitionToRoute('pool', pool);
                },
                function failure(jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                }
            );
        },
        retry: function () {
            this.set('status', undefined);
        },
        cancel: function () {
            this.transitionToRoute('pools');
        }
    },

    missingName: function () {
        return this.get('name') ? false : true;
    }.property('name'),

    validated: function () {
        return !this.get('missingName');
    }.property('missingName')
});