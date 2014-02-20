/*global console, App, Em, $ */
App.ExportRoute = Em.Route.extend({
    setupController: function (controller, model) {
        controller.setProperties({
            model: [],
            selectAllAttributes: true,
            ready: false,
            offset: 0,
            isLoading: false,
            incomplete: true,
            downloadLink: undefined
        });
    }
});