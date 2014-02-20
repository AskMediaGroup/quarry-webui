/*globals module, test, asyncTest, start, equal, expect, ok, visit, find,
          console, Em, App, Quarry, QuarryTest, $ */
module('Job API', {
    setup: function () {
        this.fixtures = QuarryTest.jobApi();
        this.cardrunner_job_uuid = 'af772f17-dcd3-4732-a358-5189170801ac';
        this.sync_job_uuid = '1ac7ca8c-4eed-4ee9-9712-cd0332f8c4aa';
    },
    teardown: function () {
        $.mockjaxClear();
    }
});

asyncTest('App.Job.mine()', function () {
    expect(1);
    QuarryTest.ajaxStub('/job/mine*', 'GET',
        this.fixtures.myJobs.data, this.fixtures.myJobs.response);
    App.Job.mine().then(
        function success(jobsArr) {
            equal(jobsArr.length, 1, 'App.Job.mine() failure!');
            start();
        }
    );
});

asyncTest('App.Job.find()', function () {
    expect(1);
    var that = this;
    QuarryTest.ajaxStub('/job/' + this.cardrunner_job_uuid + '*', 'GET',
        this.fixtures.cardrunner.data, this.fixtures.cardrunner.response);
    App.Job.find(this.cardrunner_job_uuid).then(
        function success(job) {
            equal(job.uuid, that.cardrunner_job_uuid,
                'App.Job.find(' + that.cardrunner_job_uuid + ') ' +
                    "returned an unexpected UUID value!");
            start();
        }
    );
});

asyncTest('App.Job.find() with children', function () {
    expect(2);
    var that = this;
    QuarryTest.ajaxStub('/job/' + this.sync_job_uuid + '?key*', 'GET',
        this.fixtures.dns_sync.data, this.fixtures.dns_sync.response);
    QuarryTest.ajaxStub('/job/' + this.sync_job_uuid + '/children*', 'GET',
        this.fixtures.dns_sync_children.data,
        this.fixtures.dns_sync_children.response);
    App.Job.find(this.sync_job_uuid).then(
        function success(job) {
            equal(job.uuid, that.sync_job_uuid,
                'App.Job.find(' + that.sync_job_uuid + ') ' +
                    'returned an unexpected UUID value!');
            equal(job.children[0].parent_uuid, that.sync_job_uuid,
                'App.Job.find(' + that.sync_job_uuid + ') ' +
                    'has a malformed "children" array!');
            start();
        }
    );
});