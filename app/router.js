/*global console, App, Em, $ */
App.Router.map(function () {
    this.resource('jobs');
    this.resource('job', { path: '/job/:job_uuid' });
    this.resource('commission', function () {
        this.resource('commissionVm', { path: '/vm' }, function () {
            this.route('specs', { path: '/:specs' });
        });
        this.resource('commissionSerp', { path: '/serp/:hosts' });
        this.resource('addPhysical', { path: '/addPhysical' }, function () {
            this.route('specs', { path: '/:specs' });
        });
    });
    this.resource('rekick', { path: '/rekick/:search_query' });
    this.resource('rename', { path: '/rename/:search_query' });
    this.resource('networks', function () {
        this.route('new');
    });
    this.resource('network', { path: '/network/:gateway' }, function () {
        this.route('delete');
    });
    this.resource('kickstarts');
    this.resource('hypervisors');
    this.resource('pools');
    this.resource('poolsNew', { path: '/pools/new' });
    this.resource('pool', {path: '/pool/:name'}, function () {
        this.route('delete');
    });
    this.resource('cardstacks');
    this.resource('cardstacksNew', { path: '/cardstacks/new' });
    this.resource('cardstack', {path: '/cardstack/:cardstack_id'}, function () {
        this.route('delete');
        this.route('run');
    });
    this.resource('cards');
    this.resource('cardsNew', { path: '/cards/new' });
    this.resource('card', { path: '/card/:card_id' }, function () {
        this.route('delete');
    });
    this.resource('metadata', function () {
        this.route('new');
    });
    this.resource('metadatum', { path: '/metadatum/:name' }, function () {
        this.route('delete');
    });
    this.resource('command', function () {
        this.route('run');
    });
    this.resource('layouts', function () {
        this.route('new');
    });
    this.resource('layout', { path: '/layout/:id' }, function () {
        this.route('delete');
        this.resource('layoutEntry', { path: '/entry/:entry' }, function () {
            this.route('delete');
        });
    });
    this.resource('dnsSync');
    this.resource('serp', { path: '/search/:search_query' }, function () {
        $.noop();
    });
    this.route('advancedSearch');
    this.resource('mortarBulk', { path: '/mortar/bulk/:bulk_id' });
    this.resource('asset', { path: '/asset/:fqdn' }, function () {
        this.route('decommission');
        this.route('cleanup');
        this.route('rekick');
        this.route('rename');
        this.route('run');
        this.resource('assetPower', { path: 'power/:power_action' });
        this.resource('assetCardstack', { path: 'cardstack/:cardstack_id' });
    });
    this.resource('export', { path: '/export/:search_query' });
});

// TODO enable non-hash URLs
// In order to do this we'll have to move the webroot of quarry to the "/"
// resource (from the current "/quarry" resource)
/*App.Router.reopen({
    location: 'history'
});*/