/*global App, Em */
App.SerpView = Em.View.extend({
    fqdnSort: 'FQDN',
    assetTagSort: 'Service_Tag',
    chassisSort: 'Chassis_Model',
    ramSort: 'RAM_Total',
    osSort: 'OS',
    ownerSort: 'Owner_Email',

    smallPage: function () {
        return App.DEFAULT_SERP_PAGE;
    }.property('App.DEFAULT_SERP_PAGE'),

    bigPage: function () {
        return App.BIG_SERP_PAGE;
    }.property('App.BIG_SERP_PAGE'),

    hugePage: function () {
        return App.HUGE_SERP_PAGE;
    }.property('App.HUGE_SERP_PAGE')
});
