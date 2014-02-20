/*global console, App, Em, $ */
App.RekickRoute = Em.Route.extend({
    model: function (params) {
        var rekickTargets = [];
        if (this.controllerFor('serp').get('content')) {
            this.controllerFor('serp').get('content').forEach(
                function (item, index, enumerable) {
                    rekickTargets.pushObject(App.RekickAsset.create({
                        id: item.id,
                        FQDN: item.FQDN
                    }));
                }
            );
        }
        return rekickTargets;
    },

    setupController: function (controller, model) {
        this.controllerFor('kickstarts').refresh();
        this.controllerFor('layouts').refresh();
        controller.set('model', model);
    }
});