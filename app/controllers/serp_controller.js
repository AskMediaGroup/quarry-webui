/*global App, Em */
App.SerpController = Em.ArrayController.extend({
    content: [],
    needs: ['asset'],
    searchTerms: App.SearchAsset.create(),
    isLoading: false,
    total: 0,

    actions: {
        reSort: function (sortAttribute) {
            this.set('isLoading', true);
            if (this.get('searchTerms.sort') === sortAttribute) {
                this.get('searchTerms').toggleProperty('desc');
            } else {
                this.get('searchTerms').setProperties({
                    sort: sortAttribute,
                    desc: false,
                    offset: 0
                });
            }
            this.refresh();
        },
        redrawPage: function (pageSize) {
            this.set('isLoading', true);
            this.get('searchTerms').setProperties({
                limit: pageSize
            });
            this.refresh();
        },
        showAsset: function (asset) {
            this.get('controllers.asset').set('formUpdated', false);
            this.transitionToRoute('asset', asset);
        },
        goNextPage: function () {
            this.set('isLoading', true);
            this.get('searchTerms').incrementProperty('offset',
                this.get('searchTerms.limit'));
            this.refresh();
        },

        goPreviousPage: function () {
            this.set('isLoading', true);
            this.get('searchTerms').decrementProperty('offset',
                this.get('searchTerms.limit'));
            this.refresh();
        }
    },

    hasResults: function () {
        return this.get('content') ? this.get('content').length > 0 : false;
    }.property('content'),

    canBePaginated: function () {
        return this.get('total') > App.DEFAULT_SERP_PAGE;
    }.property('total', 'searchTerms.limit', 'App.DEFAULT_SERP_PAGE'),

    pages: function () {
        return Math.ceil(this.get('total') / this.get('searchTerms.limit'));
    }.property('total', 'searchTerms.limit'),

    hasPages: function () {
        return (this.get('pages') > 1);
    }.property('pages'),

    hasPreviousPages: function () {
        return this.get('searchTerms.offset');
    }.property('searchTerms.offset'),

    hasNextPages: function () {
        return ((this.get('total') - this.get('searchTerms.offset')) >
            this.get('searchTerms.limit'));
    }.property('total', 'searchTerms.offset', 'searchTerms.limit'),

    fqdnSearch: function (fqdn) {
        this.set('isLoading', true);
        // Reset any existing asset search attributes
        this.get('searchTerms').set('asset', {});
        // And then define a clean 'FQDN Search'
        this.get('searchTerms').setProperties({
            asset: {
                FQDN: fqdn
            },
            ips: [],
            limit: App.DEFAULT_SERP_PAGE,
            offset: App.DEFAULT_SERP_OFFSET,
            sort: App.DEFAULT_SERP_SORT,
            desc: App.DEFAULT_SERP_DESC
        });
        return this.find();
    },

    find: function () {
        var that = this;
        this.set('isLoading', true);
        return App.Serp.find(this.get('searchTerms')).then(
            function (response) {
                that.setProperties({
                    total: response.total,
                    content: response.assets
                });
                that.set('isLoading', false);
                return response.assets;
            }
        );
    },

    refresh: function () {
        var that = this;
        this.find().then(
            function (response) {
                that.set('content', response);
            }
        );
    }
});
