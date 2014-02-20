/*globals module, test, asyncTest, start, equal, expect, ok, visit, find,
          console, Em, App, Quarry, QuarryTest, $ */
module('Serp API', {
    setup: function () {
        this.searchAsset = App.SearchAsset.create({
            asset: {
                FQDN: 'testfqdn.mydomain'
            },
            ips: [],
            limit: App.DEFAULT_SERP_PAGE,
            offset: App.DEFAULT_SERP_OFFSET,
            sort: App.DEFAULT_SERP_SORT,
            desc: App.DEFAULT_SERP_DESC
        });
        this.fixtures = QuarryTest.serpApi(this.searchAsset);
    },
    teardown: function () {
        $.mockjaxClear();
        Em.run(this.searchAsset, 'destroy');
    }
});

asyncTest('App.Serp.search()', function () {
    expect(3);
    var that = this;
    QuarryTest.ajaxStub('/asset/search*', 'POST',
        this.fixtures.search.data, this.fixtures.search.response);
    App.Serp.search(this.searchAsset).then(
        function success(obj) {
            equal(obj.total, 1,
                'App.Serp.search() returned an unexpected "total" value!');
            equal(obj.assets.length, 1,
                'App.Serp.search() returned an unexpected number of assets!');
            equal(obj.assets[0].get('FQDN'), that.searchAsset.get('asset.FQDN'),
                'App.Serp.search() returned an unexpected asset FQDN!');
            start();
        }
    );
});