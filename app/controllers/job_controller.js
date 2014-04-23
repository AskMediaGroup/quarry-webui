/*global window, App, Em */
App.JobController = Em.ObjectController.extend({
    content: {},
    needs: ['application'],
    jobRefreshId: null,

    actions: {
        refresh: function () {
            this.refresh();
        }
    },

    jobLogs: function () {
        /** jobLogs(): An observer function that either tails logs
         *  or stops tailing logs */
        if (!this.get('done')) {
            if (this.get('logTailId') === null) {
                this.tailLogs(this.get('content'));
            }
        } else {
            // if the job is complete we may need to stop tailing logs
            if (this.get('logTailId') > 0) {
                this.stopTailingLogs(this.get('content'));
            }
        }
    }.observes('logs.@each'),

    childJobLogs: function () {
        /** childJobLogs(): An observer function that manages child job logs */
        if (this.get('children')) {
            this.get('children').forEach(
                function (item, index, enumerable) {
                    App.Logging.find({
                        where: {
                            'context.job.uuid': item.get('uuid')
                        }
                    }).then(
                        function (log) {
                            item.set('logs', log.entries);
                        }
                    );
                }
            );
        }
    }.observes('children.@each'),

    jobRefresh: function () {
        /** jobRefresh(): An observer function that either sets up
         *  an auto-refresh interval or cancels an existing one */
        var intervalId, that = this;
        // We only want to call SetInterval once,
        // so we register the returned interval ID
        if (!this.get('done')) {
            if (this.get('jobRefreshId') === null) {
                intervalId = Math.abs(window.setInterval(function () {
                    that.autoJobRefresh();
                }, App.JOB_REFRESH));
                this.set('jobRefreshId', intervalId);
            }
        } else if (this.get('allJobsDone')) {
            // if the job and child jobs are in a done state
            // we don't need to refresh anymore
            if (this.get('jobRefreshId') > 0) {
                window.clearInterval(this.get('jobRefreshId'));
                this.set('jobRefreshId', -1);
            }
        }
    }.observes('content'),

    allJobsDone: function () {
        if (this.get('children')) {
            return !this.get('children').someProperty('done', false) &&
                this.get('done');
        }
        return this.get('done');
    }.property('state', 'children.@each.state'),

    refresh: function () {
        var logs, logTailId, that = this;
        logs = this.get('logs');
        logTailId = this.get('logTailId');
        this.set('isRefreshing', true);
        App.Jobs.find(this.get('uuid')).then(
            function (job) {
                if (job.get('output.output_oid')) {
                    switch (job.get('func')) {
                    case ('run_cardstack'):
                        App.Cardstack.get_output(
                            job.get('output.output_oid')
                        ).then(function (output) {
                            job.set('output_docstore', output);
                            that.setProperties({
                                content: job,
                                isRefreshing: false,
                                logs: logs,
                                logTailId: logTailId
                            });
                        });
                        break;
                    case ('run_script'):
                        App.Command.get_output(
                            job.get('output.output_oid')
                        ).then(function (output) {
                            job.set('output_docstore', output);
                            that.setProperties({
                                content: job,
                                isRefreshing: false,
                                logs: logs,
                                logTailId: logTailId
                            });
                        });
                        break;
                    default:
                        break;
                    }
                } else {
                    that.setProperties({
                        content: job,
                        isRefreshing: false,
                        logs: logs,
                        logTailId: logTailId
                    });
                }
            }
        );
    },

    autoJobRefresh: function (job) {
        // We only want to auto-refresh jobs data
        // if we're currently looking at a job
        if (this.get('controllers.application').get('currentPath') === 'job') {
            this.refresh();
        } else {
            window.clearInterval(this.get('jobRefreshId'));
            this.set('jobRefreshId', null);
        }
    },

    autoLogFetch: function (job) {
        // We don't want to auto-refresh logs data
        // if we're not currently looking at a job
        if (this.get('controllers.application').get('currentPath') === 'job') {
            var intervalId = job.get('logTailId');
            App.Logging.find({
                where: {
                    'context.job.uuid': job.get('uuid')
                }
            }).then(
                function (response) {
                    job.setProperties({
                        logs: response.entries,
                        logTailId: intervalId
                    });
                }
            );
        } else {
            this.stopTailingLogs(job);
        }
    },

    tailLogs: function (job) {
        var intervalId, that = this;
        intervalId = Math.abs(window.setInterval(function () {
            that.autoLogFetch(job);
        }, App.JOB_LOGS_REFRESH));
        job.set('logTailId', intervalId);
    },

    stopTailingLogs: function (job) {
        window.clearInterval(job.get('logTailId'));
        job.set('logTailId', -1);
    },

    logTimestamps: function () {
        var that = this;
        if (this.get('content.logs')) {
            this.get('content.logs').forEach(function (item, index, enumerable) {
                if (that.get('content.logs')[index - 1]) {
                    if (that.get('content.logs')[index].get('level') !== 'ERROR') {
                        if (that.get('content.logs')[index].get('time') -
                                that.get('content.logs')[index - 1].get('time') < 1) {
                            that.get('content.logs')[index].set(
                                'displayTimestamp',
                                false
                            );
                        }
                    }
                }
            });
        }
    }.observes('content.logs.@each')
});
