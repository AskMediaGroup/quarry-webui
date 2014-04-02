/*global App, Em */
App.CloudStatsController = Em.ObjectController.extend({
    content: {},
    cloud: [],
    bogon: [],

    getCloudStats: function () {
        var regex, dc, that = this;
        this.set('cloud', []);
        App.CLOUD_LOCALES.forEach(function (item, index, enumerable) {
            that.get('cloud').pushObject(App.CloudStats.create({
                locale: item.toUpperCase(),
                hypervisors: []
            }));
        });
        regex = App.DC_REGEX_MATCH;
        App.Hypervisor.find().then(
            function (response) {
                response.forEach(function (item, index, enumerable) {
                    if (item.name.match(regex)) {
                        dc = item.name.match(regex).length === 2 ?
                                item.name.match(regex)[1] : null;
                        that.addToCloud(item, dc);
                    } else {
                        that.get('bogon').pushObject(item);
                    }
                });
            }
        );
    },

    addToCloud: function (hypervisor, locale) {
        this.get('cloud').forEach(function (item, index, enumerable) {
            if (item.get('locale').toUpperCase() === locale.toUpperCase()) {
                item.get('hypervisors').pushObject(hypervisor);
                item.incrementProperty('storage_free', hypervisor.storage_free);
                item.incrementProperty('storage_total', hypervisor.storage_total);
                item.incrementProperty('memory_free', hypervisor.memory_free);
                item.incrementProperty('memory_total', hypervisor.memory_total);
            }
        });
    }
});
