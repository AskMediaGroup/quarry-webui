/*globals module, test, asyncTest, start, equal, expect, ok, visit, find,
          console, Em, App, Quarry, $ */
module('App.Asset', {
    setup: function () {
        // In case the asynch call to App.Meta.find() doesn't come back in time
        App.DOMAIN_SUFFIX = App.DOMAIN_SUFFIX || '.mydomain';
        this.asset = App.Asset.create({
            FQDN: 'testhost' + App.DOMAIN_SUFFIX,
            VM: 1,
            Linux: 1,
            Windows: 0,
            SW_RAID: 0
        });
    },
    teardown: function () {
        Em.run(this.asset, 'destroy');
    }
});

test('computed properties', function () {
    expect(5);
    equal(this.asset.get('hostname'), 'testhost',
        'App.Asset.hostname() computed property failed!');
    equal(this.asset.get('isVm'), true,
        'App.Asset.isVm() computed property failed!');
    equal(this.asset.get('isLinux'), true,
        'App.Asset.isLinux() computed property failed!');
    equal(this.asset.get('isWindows'), false,
        'App.Asset.isWindows() computed property failed!');
    equal(this.asset.get('isSwRaid'), false,
        'App.Asset.isSwRaid() computed property failed!');
});