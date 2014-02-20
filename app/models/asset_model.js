/*global App, Quarry, Em, DS, $ */
/**
 * App.Asset class
 * @class App.Asset
 * @extends Quarry.Asset
 * @classdesc Asset model class
 */
App.Asset = Quarry.Asset.extend(
    /** @lends App.Asset.prototype */
    {
        hostname: function () {
            return this.get('FQDN') ? this.get('FQDN').split(App.DOMAIN_SUFFIX)[0] : '';
        }.property('FQDN'),
        isVm: function () {
            return this.get('VM') === 1;
        }.property('VM'),
        isLinux: function () {
            return this.get('Linux') === 1;
        }.property('Linux'),
        isWindows: function () {
            return this.get('Windows') === 1;
        }.property('Windows'),
        isSwRaid: function () {
            return this.get('SW_RAID') === 1;
        }.property('SW_RAID')
    }
);