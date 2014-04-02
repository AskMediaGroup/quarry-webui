/*global App, Em */
App.MortarBulkController = Em.ObjectController.extend({
    content: {},
    needs: ['kickstarts', 'layouts', 'confirmation'],
    kickstartsBinding: 'controllers.kickstarts.content',
    layoutsBinding: 'controllers.layouts.content',
    readyBinding: 'controllers.confirmation.ready',

    actions: {
        confirm: function () {
            this.set('confirming', true);
            this.get('controllers.confirmation').reset();
        },
        verify: function () {
            var that = this;
            return App.MortarBulk.verify(this.get('content.bulk_id')).then(
                function (response) {
                    // App.MortarBulk.verify returns a job object, so we
                    // pass that to the 'job' route as its model
                    that.transitionToRoute('job', App.Job.create(response));
                }
            );
        },
        cancel: function () {
            var that = this;
            return App.MortarBulk.cancel(this.get('content.bulk_id')).then(
                function (response) {
                    that.set('content', response);
                }
            );
        }
    },

    destructive: function () {
        if (this.get('content.func_name') === 'bulk_physical_create') {
            return false;
        }
        return true;
    }.property('content'),

    hasRekickArgs: function () {
        return this.get('content.kwargs.kstarget') &&
            this.get('content.kwargs.layout') &&
            this.get('content.func_name') === 'rekick';
    }.property('content.kwargs', 'content.func_name'),

    osName: function () {
        if (this.get('content.kwargs.kstarget.id')) {
            return this.get('kickstarts').findBy(
                'id',
                this.get('content.kwargs.kstarget.id')
            ).name;
        }
    }.property('content.kwargs.kstarget.id'),

    layoutName: function () {
        if (this.get('content.kwargs.layout.partlayout_id')) {
            return this.get('layouts').findBy(
                'partlayout_id',
                this.get('content.kwargs.layout.partlayout_id')
            ).name;
        }
    }.property('content.kwargs.layout.partlayout_id'),

    hasAddAssetArgs: function () {
        return (this.get('content.func_name') === 'bulk_physical_create');
    }.property('content.kwargs', 'content.func_name'),

    kwargsDump: function () {
        if (this.get('content.kwargs')) {
            return JSON.stringify(this.get('content.kwargs'));
        }
        return '';
    }.property('kwargs'),

    network: function () {
        // In the case of a mortarBulk return object from a
        // "bulk_physical_create" request, the network details
        // are uniform across all kwargs 'network' array indices
        if (this.get('hasAddAssetArgs')) {
            return this.get('content.kwargs')[0] ?
                    this.get('content.kwargs')[0].network :
                    undefined;
        }
    }.property('hasAddAssetArgs', 'content'),

    lomNetwork: function () {
        // In the case of a mortarBulk return object from a
        // "bulk_physical_create" request, the network details
        // are uniform across all kwargs 'network' array indices
        if (this.get('hasAddAssetArgs')) {
            return this.get('content.kwargs')[0] ?
                    this.get('content.kwargs')[0].lom_network :
                    undefined;
        }
    }.property('hasAddAssetArgs', 'content'),

    prepBulk: function (action, routeVar, data) {
        var that = this;
        return App.MortarBulk.prepBulk(action, routeVar, data).then(
            function (response) {
                that.set('content', response);
                return response;
            }
        );
    }
});
