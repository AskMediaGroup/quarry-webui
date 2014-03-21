/*global App, Em */
App.LocaleStats = Em.Mixin.create({
    storage_free: 0,
    storage_free_TiB: function () {
        return (this.get('storage_free') / 1048576).toFixed(2);
    }.property('storage_free'),
    storage_total: 0,
    storage_total_TiB: function () {
        return (this.get('storage_total') / 1048576).toFixed(2);
    }.property('storage_total'),
    storage_percent_free: function () {
        return (this.get('storage_free') / this.get('storage_total') * 100).toFixed(2);
    }.property('storage_free', 'storage_total'),
    storage_free_style: function () {
        return 'width: ' + Number(this.get('storage_percent_free')).toFixed() + '%';
    }.property('storage_percent_free'),
    storage_used_style: function () {
        return 'width: ' + (100 - Number(this.get('storage_percent_free')).toFixed()) + '%';
    }.property('storage_percent_free'),
    memory_free: 0,
    memory_free_GiB: function () {
        return (this.get('memory_free') / 1024).toFixed();
    }.property('memory_free'),
    memory_total: 0,
    memory_total_GiB: function () {
        return (this.get('memory_total') / 1024).toFixed();
    }.property('memory_total'),
    memory_percent_free: function () {
        return (this.get('memory_free') / this.get('memory_total') * 100).toFixed(2);
    }.property('memory_free', 'memory_total'),
    memory_free_style: function () {
        return 'width: ' + Number(this.get('memory_percent_free')).toFixed() + '%';
    }.property('memory_percent_free'),
    memory_used_style: function () {
        return 'width: ' + (100 - Number(this.get('memory_percent_free')).toFixed()) + '%';
    }.property('memory_percent_free'),
    hypervisors: []
});