/*global App, Em */
App.OsTargetsController = Em.ArrayController.extend({
    content: [],

    find: function () {
        var that = this;
        this.set('isLoading', true);
        return App.OsTargets.find({sort: 'name', limit: -1}).then(
            function (response) {
                var ret = [];
                response.data.forEach(function(target) {
                    ret.pushObject(App.OsTargets.create(target));
                });
                that.set('isLoading', false);
                return ret;
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
