/*globals module, test, asyncTest, start, equal, expect, ok, visit, find,
          console, Em, App, Quarry, QuarryTest, $ */
module('Kickstart API', {
    setup: function () {
        this.kickstarts = [
            App.Kickstart.create({
                "available": 1,
                "filename": "debian6.xen4.cfg",
                "id": 6,
                "name": "Debian 6 Xen4"
            }),
            App.Kickstart.create({
                "available": 1,
                "filename": "sl6.1.x64-quarry.cfg",
                "id": 3,
                "name": "SL6.1 Quarry"
            })
        ];
        this.fixtures = QuarryTest.kickstartApi(this.kickstarts);
    },
    teardown: function () {
        $.mockjaxClear();
    }
});

asyncTest('App.Kickstart.find()', function () {
    expect(3);
    var that = this;
    QuarryTest.ajaxStub('/ks/target*', 'GET',
        this.fixtures.find.data, this.fixtures.find.response);
    App.Kickstart.find().then(
        function success(obj) {
            equal(obj.length, that.fixtures.find.response.data.length,
                'App.Kickstart.find() returned an unexpected data array!');
            equal(obj[0].get('filename'), that.kickstarts[0].get('filename'),
                'Unexpected kickstart filename in index 0 of response array');
            equal(obj[1].get('filename'), that.kickstarts[1].get('filename'),
                'Unexpected kickstart filename in index 0 of response array');
            start();
        }
    );
});