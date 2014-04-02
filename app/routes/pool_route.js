/*global App, Em, $ */
App.PoolRoute = Em.Route.extend({
    model: function (params) {
        this.controllerFor('pool').set('isLoading', true);
        return App.Pool.find(params.name).then(
            function (pool) {
                return App.Pool.get_hypervisors(pool.get('name')).then(
                    function success(data, textStatus, jqXHR) {
                        var hypervisors = [];
                        $.each(data, function (i, hypervisor) {
                            hypervisors.pushObject(
                                App.Hypervisor.create(hypervisor)
                            );
                        });
                        pool.set('hypervisors', hypervisors);
                        return pool;
                    }
                );
            }
        );
    },

    serialize: function (model, params) {
        return { name: model.name };
    },

    setupController: function (controller, model) {
        this.controllerFor('networks').refresh().then(
            function (response) {
                model.set('newName', model.get('name'));
                App.Pool.get_hypervisors(model.get('name')).then(
                    function success(data, textStatus, jqXHR) {
                        var hypervisors = [];
                        $.each(data, function (i, hypervisor) {
                            hypervisors.pushObject(
                                App.Hypervisor.create(hypervisor)
                            );
                        });
                        model.set('hypervisors', hypervisors);
                        // While we're storing exclusive value lists in memory
                        // as constant arrays we need to account for the fact that the db
                        // may have values that aren't in our arrays
                        if ($.inArray(model.prodtype, App.PRODUCTION_TYPES) === -1) {
                            App.PRODUCTION_TYPES.pushObject(model.prodtype);
                        }
                        if ($.inArray(model.business_unit, App.BUSINESS_UNITS) === -1) {
                            App.BUSINESS_UNITS.pushObject(model.business_unit);
                        }
                        controller.set('model', model);
                        controller.setProperties({
                            isLoading: false,
                            formUpdated: false
                        });
                    }
                );
            }
        );
    }
});
