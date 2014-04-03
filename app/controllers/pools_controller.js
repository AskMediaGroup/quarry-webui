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
                        function (data) {
                            var i, k, hypervisors = [];
                            for (i = 0, k = data.length; i < k; i += 1) {
                                pool.incrementProperty('storage_free',
                                    data[i].storage_free);
                                pool.incrementProperty('storage_total',
                                    data[i].storage_total);
                                pool.incrementProperty('memory_free',
                                    data[i].memory_free);
                                pool.incrementProperty('memory_total',
                                    data[i].memory_total);
                                hypervisors.pushObject(
                                    App.Hypervisor.create(data[i])
                                );
                            }
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
