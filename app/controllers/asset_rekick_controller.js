/*global App, Em */
App.AssetRekickController = Em.ObjectController.extend({
    content: {},
    needs: ['osTargets', 'layouts', 'confirmation'],
    osTargetssBinding: 'controllers.osTargets.content',
    osTargetsBinding: 'controllers.osTargets.content',
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
                App.OsTargets.create({
                    id: this.get('osTargets').findBy(
                        'name',
                        this.get('osTarget')
                    ).id
                }),
                App.Layouts.create({
                    layout_id:
                        this.get('layouts').findBy(
                            'name',
                            this.get('layout')
                        ).layout_id
                })
            ).then(
                function (response) {
                    // App.Mortar.rekick returns a job object, so we
                    // pass that to the 'job' route as its model
                    that.transitionToRoute('job', App.Jobs.create(response));
                }
            );
        },
        confirm: function () {
            this.set('optionsSelected', true);
            this.get('controllers.confirmation').reset();
        }
    },

    optionsReady: function () {
        return (this.get('layout') && this.get('osTarget') ? true : false);
    }.property('layout', 'osTarget')
});
