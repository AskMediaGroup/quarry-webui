/*global console, App, Quarry, Em, $ */
App.LayoutRoute = Em.Route.extend({
    model: function (params) {
        return App.Layout.find(params.id).then(
            function (response) {
                return response;
            }
        );
    },

    serialize: function (model, params) {
        return { id: model.partlayout_id };
    },

    setupController: function (controller, model) {
        controller.setProperties({
            model: model,
            isBase: model.base ? true : false,
            isAvailable: model.available ? true : false,
            isSwRaid: model.swraid ? true : false,
            status: undefined
        });
        controller.get('model.entries').forEach(
            function (item, index, enumerable) {
                Em.set(item, 'willGrow', item.grow === 1);
            }
        );
        controller.set('formUpdated', false);
    }
});