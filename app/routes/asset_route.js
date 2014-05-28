/*global App, Em, $ */
App.AssetRoute = Em.Route.extend({
    model: function (params) {
        var queryObj = {
            where: {
                FQDN: params.fqdn
            }
        };
        this.controllerFor('asset').set('isLoading', true);
        return App.Assets.find(queryObj).then(
            function (data) {
                return App.Assets.create(data.data[0]);
            }
        );
    },

    serialize: function (model, params) {
        return { fqdn: model.get('FQDN') };
    },

    setupController: function (controller, model) {
        // While we're storing available application types in memory
        // as constant arrays we need to account for the fact that the db
        // may have values that aren't in our arrays
        if ($.inArray(model.Application, App.APPLICATION_TYPES) === -1) {
            App.APPLICATION_TYPES.pushObject(model.Application);
        }
        if ($.inArray(model.ProdType, App.PRODUCTION_TYPES) === -1) {
            App.PRODUCTION_TYPES.pushObject(model.ProdType);
        }
        if ($.inArray(model.Business_Unit, App.BUSINESS_UNITS) === -1) {
            App.BUSINESS_UNITS.pushObject(model.Business_Unit);
        }
        controller.setProperties({
            model: model
        });
        controller.setProperties({
            status: undefined,
            formUpdated: false,
            isLoading: false
        });
        controller.getVmData();
        controller.getHypervisorData();
    }
});
