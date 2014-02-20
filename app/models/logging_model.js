/*global App, Quarry, Em, DS, $ */
App.Logging = Quarry.Logging.extend({
    /** A log entry */

    timestamp: function () {
        var date = new Date(this.get('time') * 1000);
        return date.toString();
    }.property('time'),

    displayTimestamp: true,

    isException: function () {
        return this.get('message').indexOf("Traceback (") > -1;
    }.property('message')
});