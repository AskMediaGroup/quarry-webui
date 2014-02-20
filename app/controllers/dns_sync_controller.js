/*global console, App, Em, $ */
App.DnsSyncController = Em.ObjectController.extend({
    actions: {
        sync: function () {
            var that = this;
            return App.Dns.sync().then(
                function (response) {
                    that.transitionToRoute('job', App.Job.create(response));
                }
            );
        },
        goIndex: function () {
            this.transitionToRoute('index');
        }
    }
});