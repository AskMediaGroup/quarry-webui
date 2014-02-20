/*globals module, test, asyncTest, start, equal, deepEqual, expect, ok, visit,
          find, console, Em, App, Quarry, QuarryTest, $ */
module('Asset API', {
    setup: function () {
        this.searchAsset = App.SearchAsset.create({
            asset: {
                FQDN: 'testasset.mydomain',
                id: 25
            },
            ips: [],
            limit: App.DEFAULT_SERP_PAGE,
            offset: App.DEFAULT_SERP_OFFSET,
            sort: App.DEFAULT_SERP_SORT,
            desc: App.DEFAULT_SERP_DESC
        });
        this.fixtures = QuarryTest.assetApi(this.searchAsset);
    },
    teardown: function () {
        $.mockjaxClear();
        Em.run(this.searchAsset, 'destroy');
    }
});

asyncTest('App.Asset.find(id)', function () {
    expect(1);
    var that = this;
    QuarryTest.ajaxStub('/asset/' + this.searchAsset.get('asset.id') + '*', 'GET',
        this.fixtures.find.data, this.fixtures.find.response);
    App.Asset.find(this.searchAsset.get('asset.id')).then(
        function success(obj) {
            deepEqual(obj.get('FQDN'), that.searchAsset.get('asset.FQDN'),
                'App.Asset.find(id) returned an unexpected asset FQDN!');
            start();
        }
    );
});

asyncTest('App.Asset.find(fqdn)', function () {
    expect(1);
    var that = this;
    QuarryTest.ajaxStub('/asset/' + this.searchAsset.get('asset.FQDN') + '*', 'GET',
        this.fixtures.find.data, this.fixtures.find.response);
    App.Asset.find(this.searchAsset.get('asset.FQDN')).then(
        function success(obj) {
            equal(obj.get('id'), that.searchAsset.get('asset.id'),
                'App.Asset.find(FQDN) returned an unexpected asset FQDN!');
            start();
        }
    );
});

asyncTest('App.Asset.update()', function () {
    expect(1);
    var that = this;
    this.searchAsset.set('asset.Notes', 'updated');
    QuarryTest.ajaxStub('/asset/' + this.searchAsset.get('asset.id') + '*', 'PUT',
        this.fixtures.update.data, this.fixtures.update.response);
    App.Asset.update(this.searchAsset.get('asset')).then(
        function success(obj) {
            equal(obj.get('Notes'), that.searchAsset.get('asset.Notes'),
                'App.Asset.update() returned an unexpected Notes value!');
            start();
        }
    );
});