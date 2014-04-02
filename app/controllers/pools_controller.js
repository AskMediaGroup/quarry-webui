/*global App, Em, $ */
App.PoolsController = Em.ArrayController.extend({
    content: [],

    find: function () {
        var that = this;
        this.set('isLoading', true);
        return App.Pool.find().then(
            function (pools_data) {
                var pools = [];
                pools_data.forEach(function (pool, index, enumerable) {
                    App.Pool.get_hypervisors(pool.get('name')).then(
                        function (hypervisors_data) {
                            var hypervisors = [];
                            $.each(hypervisors_data, function (i, hypervisor) {
                                pool.incrementProperty('storage_free',
                                    hypervisor.storage_free);
                                pool.incrementProperty('storage_total',
                                    hypervisor.storage_total);
                                pool.incrementProperty('memory_free',
                                    hypervisor.memory_free);
                                pool.incrementProperty('memory_total',
                                    hypervisor.memory_total);
                                hypervisors.pushObject(
                                    App.Hypervisor.create(hypervisor)
                                );
                            });
                            pool.set('hypervisors', hypervisors);
                            pools.pushObject(pool);
                        }
                    );
                });
                that.set('isLoading', false);
                return pools;
            }
        );
    },

    refresh: function () {
        var that = this;
        this.find().then(
            function (response) {
                that.set('content', response);
            }
        );
    },

    testFunc: function () {
        console.log(this.get('content').findBy('dc', 'mwh').name);
    }
});
