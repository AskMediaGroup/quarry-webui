/*global App, Em */
App.LocaleStatsController = Em.ObjectController.extend({
    content: {},
    needs: ['serp'],
    searchTermsBinding: 'controllers.serp.searchTerms',

    actions: {
        find: function () {
            var that = this;
            this.get('searchTerms').setProperties({
                asset: App.getNonEmptyAttrs(this.get('localeAsset'))
            });
            this.transitionToRoute('serp.index');
            this.get('controllers.serp').find().then(
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
