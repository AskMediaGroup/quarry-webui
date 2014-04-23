/*globals module, test, asyncTest, start, equal, expect, ok, visit, find,
          console, Em, App, Quarry, QuarryTest, $ */
module('OS Target API', {
    setup: function () {
        this.osTargets = [
            App.OsTarget.create({
                "available": 1,
                "filename": "debian6.xen4.cfg",
                "id": 6,
                "name": "Debian 6 Xen4"
            }),
            App.OsTarget.create({
                "available": 1,
                "filename": "sl6.1.x64-quarry.cfg",
                "id": 3,
                "name": "SL6.1 Quarry"
            })
        ];
        this.fixtures = QuarryTest.osTargetApi(this.osTargets);
    },
    teardown: function () {
        $.mockjaxClear();
    }
});

asyncTest('App.OsTarget.find()', function () {
    expect(3);
    var that = this;
    QuarryTest.ajaxStub('/quarry/pxe/targets*', 'GET',
        this.fixtures.find.data, this.fixtures.find.response);
    App.OsTarget.find().then(
        function success(obj) {
            equal(obj.length, that.fixtures.find.response.data.length,
                'App.OsTarget.find() returned an unexpected data array!');
            equal(obj[0].get('filename'), that.osTargets[0].get('filename'),
                'Unexpected OS Target filename in index 0 of response array');
            equal(obj[1].get('filename'), that.osTargets[1].get('filename'),
                'Unexpected OS Target filename in index 0 of response array');
            start();
        }
    );
});