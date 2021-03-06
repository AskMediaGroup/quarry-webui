/*global App, Em, Quarry */
/**
 * The Jobs Controller
 * @class App.JobsController
 * @extends Em.ArrayController
 * @classdesc jobs data for the logged-in user
 */
App.JobsController = Em.ArrayController.extend(
    /** @lends App.JobsController.prototype */
    {
        /**
         * The model array
         * @type {Array}
         */
        content: [],
        /**
         * Controller dependencies
         * @type {Array}
         * @constant
         * */
        needs: ['application'],

        /**
         * The actions hash
         * @type {Object}
         * @property {function} refresh - Refresh the jobs data
         */
        actions: {
            refresh: function () {
                this.refresh();
            }
        },

        /**
         * Stored setInterval id value of auto jobs refresh
         * @type {number}
         */
        autoJobCheckId: null,

        /**
         * Returns the jobs model array, sorted by queue time
         * @type {ComputedProperty}
         */
        sorted: function () {
            return this.get('content').sortBy('queue_time').reverse();
        }.property('content.@each.queue_time'),

        /**
         * Get the complete list of the logged-in user's jobs
         */
        find: function () {
            var that = this;
            this.set('isLoading', true);
            return App.Jobs.mine().then(function (jobs) {
                that.setProperties({
                    isLoading: false,
                    loaded: true
                });
                return jobs;
            });
        },

        /**
         *  Refresh the jobs list
         */
        refresh: function () {
            var that = this;
            this.find().then(function (jobs) {
                that.set('content', jobs);
            });
        },

        /**
         * Initial invocation of setInterval
         */
        registerAutoJobCheck: function () {
            var intervalId, that = this;
            // We only want to call SetInterval once,
            // so we register the returned interval ID
            if (this.get('autoJobCheckId') === null) {
                intervalId = setInterval(function () {
                    that.autoJobCheck();
                }, App.JOBS_REFRESH);
                this.set('autoJobCheckId', intervalId);
            }
        },

        /**
         * Periodic jobs refresh, managed by setInterval
         */
        autoJobCheck: function () {
            // We don't want to auto-refresh jobs data
            // if we're currently looking at a job
            if (this.get('controllers.application').get(
                    'currentPath'
                ) !== 'jobs') {
                this.refresh();
            }
        },

        /**
         * Load FQDNs for jobs
         */
        getFQDNs: function () {
            this.get('content').forEach(function(job, index, enumerable) {
                job.set('fqdn', null);
                switch (job.get('func')) {
                case ('commission_vm'):
                case ('bulk_physical_create'):
                    job.set('fqdn', job.get('args')[0].asset.FQDN);
                    break;
                case ('power'):
                case ('decommission'):
                case ('rekick'):
                case ('rename'):
                case ('asset_cleanup'):
                    Quarry.AssetHistories.find({
                        'where': {
                            'asset_id': job.get('args')[0]
                        },
                        'limit': 1,
                        'sort': '-history_id'}).then(function (histories) {
                            if (histories.data.length === 1) {
                                job.set('fqdn', histories.data[0].fqdn);
                            }
                        }
                    );
                    break;
                }
            });
        }.observes('content')
    }
);
