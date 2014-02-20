/*globals module, test, asyncTest, start, equal, expect, ok, visit, find,
          console, Em, App, Quarry, QuarryTest, $ */
module('Logging API', {
    setup: function () {
        this.fixtures = QuarryTest.loggingApi();
    },
    teardown: function () {
        $.mockjaxClear();
    }
});

asyncTest('App.Logging.findJob()', function () {
    expect(1);
    QuarryTest.ajaxStub('/logging*', 'GET',
        this.fixtures.findJob.data, this.fixtures.findJob.response);
    var jobUuid = 'af772f17-dcd3-4732-a358-5189170801ac';
    App.Logging.findJob(jobUuid).then(
        function success(logsArr) {
            equal(logsArr.entries[0].context.job.uuid, jobUuid,
                "App.Logging.findJob('af772f17-dcd3-4732-a358-5189170801ac') " +
                    "returned an unexpected job UUID!");
            start();
        }
    );
});