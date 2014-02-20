/*global App, Em */
App.SearchAsset = Em.Object.extend({
    asset: {},
    ips: [],

    limit: function () {
        return App.DEFAULT_SERP_PAGE;
    }.property('App.DEFAULT_SERP_PAGE'),

    offset: function () {
        return App.DEFAULT_SERP_OFFSET;
    }.property('App.DEFAULT_SERP_OFFSET'),

    sort: function () {
        return App.DEFAULT_SERP_SORT;
    }.property('App.DEFAULT_SERP_SORT'),

    desc: function () {
        return App.DEFAULT_SERP_DESC;
    }.property('App.DEFAULT_SERP_DESC')
});