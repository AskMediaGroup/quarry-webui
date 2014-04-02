/*global App, Em */
App.SerpRoute = Em.Route.extend({
    model: function (params, transition) {
        if (transition.hasOwnProperty('urlMethod')) {
            return this.controllerFor('serp').fqdnSearch(params.search_query).then(
                function (response) {
                    return response;
                }
            );
        }
        return this.controllerFor('serp').get('model');
    },

    serialize: function (model, params) {
        if (this.controllerFor('serp').get('searchTerms.asset.FQDN')) {
            return {
                search_query:
                    this.controllerFor('serp').get('searchTerms.asset.FQDN')
            };
        }
        return {
            search_query: 'advanced'
        };
    },

    setupController: function (controller, model) {
        if (model) {
            controller.set('content', model);
        } else {
            controller.set('content', []);
        }
    }
});
