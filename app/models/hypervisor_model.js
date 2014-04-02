/*global App, Em */
App.Hypervisor = Quarry.Hypervisor.extend({
    freeMemGiB: function () {
        return typeof (this.get('memory_free')) === 'number' ?
                String(this.get('memory_free') / 1024).split('.')[0] + ' GiB' :
                undefined;
    }.property('memory_free'),

    totalMemGiB: function () {
        return typeof (this.get('memory_total')) === 'number' ?
                String(this.get('memory_total') / 1024).split('.')[0] + ' GiB' :
                undefined;
    }.property('memory_total'),

    freeStorageGiB: function () {
        return typeof (this.get('storage_free')) === 'number' ?
                String(this.get('storage_free') / 1024).split('.')[0] + ' GiB' :
                undefined;
    }.property('storage_free'),

    totalStorageGiB: function () {
        return typeof (this.get('storage_total')) === 'number' ?
                String(this.get('storage_total') / 1024).split('.')[0] + ' GiB' :
                undefined;
    }.property('storage_total')
});
