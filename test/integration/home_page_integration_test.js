/*globals module, test, asyncTest, start, equal, expect, ok, visit, find,
          console, Em, App, Quarry, QuarryTest, $ */
module('home page', {
    setup: function () {
        Em.run(function () {
            App.reset();
            App.deferReadiness();
        });
        this.fixtures = QuarryTest.homePage();
    },
    teardown: function () {
        $.mockjaxClear();
    }
});

test('page view', function () {
    expect(1);
    QuarryTest.ajaxStub('/job/mine*', 'GET',
        this.fixtures.myJobs.data, this.fixtures.myJobs.response);
    QuarryTest.ajaxStub('/cardrunner/cardstacks*', 'GET',
        this.fixtures.cardstacks.data, this.fixtures.cardstacks.response);
    QuarryTest.ajaxStub('/vm/hypervisors*', 'GET',
        this.fixtures.hypervisors.data, this.fixtures.hypervisors.response);
    Em.run(App, 'advanceReadiness');
    visit("/").then(function () {
        equal(find('#LAX').text(), '1 hypervisors in LAX', 'Hypervisors stats error!');
    });
});