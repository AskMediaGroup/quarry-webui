/*global App, Em */
App.RenameRoute = Em.Route.extend({
    model: function (params) {
        var renameTargets = [];
        if (this.controllerFor('serp').get('content')) {
            this.controllerFor('serp').get('content').forEach(
                function (item, index, enumerable) {
                    renameTargets.pushObject(App.RenameAsset.create({
                        id: item.id,
                        FQDN: item.FQDN
                    }));
                }
            );
        }
        return renameTargets;
    },

    setupController: function (controller, model) {
        controller.setProperties({
            confirming: false,
            model: model
        });
    }
});
