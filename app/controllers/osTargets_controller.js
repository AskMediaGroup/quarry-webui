/*global App, Em */
App.OsTargetsController = Em.ArrayController.extend({
    content: [],

    find: function () {
        var that = this;
        this.set('isLoading', true);
        return App.OsTargets.find().then(
            function (response) {
                that.set('isLoading', false);
                return response;
            }
        );
    },

    refresh: function () {
        var that = this;
        this.find().then(
            function (response) {
                that.set('content', response);
            }
        );
    }
});
