/*global App, Em */
App.RekickController = Em.ArrayController.extend({
    content: [],
    needs: ['osTargets', 'layouts', 'serp'],
    osTargetsBinding: 'controllers.osTargets.content',
    layoutsBinding: 'controllers.layouts.content',
    searchTermsBinding: 'controllers.serp.searchTerms',

    actions: {
        prepBulk: function () {
            var data, that = this;
            data = Em.Object.create({
                query: App.Assets.create(this.get('searchTerms.asset')),
                kstarget: App.OsTargets.create({
                    id: this.get('osTargets').findBy(
                        'name',
                        this.get('osTarget')
                    ).id
                }),
                layout: App.Layouts.create({
                    layout_id:
                        this.get('layouts').findBy(
                            'name',
                            this.get('layout')
                        ).layout_id
                })
            });
            // Passing an undefined variable as the 2nd arg because there's no
            // dynamic route segment for rekick
            App.MortarBulk.prepBulk('rekick', undefined, data).then(
                function (response) {
                    that.transitionToRoute('mortarBulk', response);
                }
            );
        },
        cancel: function () {
            this.transitionToRoute('serp.index');
        }
    },

    optionsReady: function () {
        return (this.get('layout') && this.get('osTarget') ? true : false);
    }.property('layout', 'osTarget')
});
