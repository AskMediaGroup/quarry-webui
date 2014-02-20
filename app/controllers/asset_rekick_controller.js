/*global console, App, Em, $ */
App.AssetRekickController = Em.ObjectController.extend({
    content: {},
    needs: ['kickstarts', 'layouts', 'confirmation'],
    kickstartsBinding: 'controllers.kickstarts.content',
    layoutsBinding: 'controllers.layouts.content',
    readyBinding: 'controllers.confirmation.ready',

    actions: {
        cancel: function () {
            this.transitionToRoute('asset.index');
        },
        rekick: function () {
            var that = this;
            return App.Mortar.rekick(
                this.get('content.id'),
                App.Kickstart.create({
                    id: this.get('kickstarts').findBy(
                        'name',
                        this.get('kickstart')
                    ).id
                }),
                App.Layout.create({
                    partlayout_id:
                        this.get('layouts').findBy(
                            'name',
                            this.get('layout')
                        ).partlayout_id
                })
            ).then(
                function (response) {
                    // App.Mortar.rekick returns a job object, so we
                    // pass that to the 'job' route as its model
                    that.transitionToRoute('job', App.Job.create(response));
                }
            );
        },
        confirm: function () {
            this.set('optionsSelected', true);
            this.get('controllers.confirmation').reset();
        }
    },

    optionsReady: function () {
        return (this.get('layout') && this.get('kickstart') ? true : false);
    }.property('layout', 'kickstart')
});