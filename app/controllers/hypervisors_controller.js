/*global App, Em */
App.HypervisorsController = Em.ArrayController.extend({
    content: [],

    find: function () {
        var that = this;
        this.set('isLoading', true);
        return App.Hypervisor.find().then(
            function success(hypervisors, textStatus, jqXHR) {
                that.set('isLoading', false);
                return hypervisors;
            },
            function failure(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                that.set('isLoading', false);
                return [];
            }
        );
    },

    refresh: function () {
        var that = this;
        this.find().then(
            function (hypervisors, textStatus, jqXHR) {
                that.set('content', hypervisors);
            }
        );
    }
});
