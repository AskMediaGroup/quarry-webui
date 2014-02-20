/*global console, App, Quarry, Em, $ */
App.KickstartsController = Em.ArrayController.extend({
    content: [],

    find: function () {
        var that = this;
        this.set('isLoading', true);
        return App.Kickstart.find().then(
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