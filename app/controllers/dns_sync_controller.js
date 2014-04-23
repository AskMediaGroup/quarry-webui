/*global App, Em */
App.DnsSyncController = Em.ObjectController.extend({
    actions: {
        sync: function () {
            var that = this;
            return App.DnsSync.sync().then(
                function (response) {
                    that.transitionToRoute('job', App.Jobs.create(response));
                }
            );
        },
        goIndex: function () {
            this.transitionToRoute('index');
        }
    }
});
