/*global console, App, Quarry, Em, $ */
App.LocaleStatsController = Em.ObjectController.extend({
    content: {},
    needs: ['serp'],
    searchTermsBinding: 'controllers.serp.searchTerms',

    actions: {
        search: function () {
            var that = this;
            this.get('searchTerms').setProperties({
                asset: App.getNonEmptyAttrs(this.get('localeAsset'))
            });
            this.transitionToRoute('serp.index');
            this.get('controllers.serp').search().then(
                function (response) {
                    that.transitionToRoute('serp.index', response);
                }
            );
        }
    },

    localeAsset: function () {
        return {
            DC: this.get('locale'),
            Application: 'Xen Host'
        };
    }.property('locale')
});