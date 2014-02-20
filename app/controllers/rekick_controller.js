/*global console, App, Em, $ */
App.RekickController = Em.ArrayController.extend({
    content: [],
    needs: ['kickstarts', 'layouts', 'serp'],
    kickstartsBinding: 'controllers.kickstarts.content',
    layoutsBinding: 'controllers.layouts.content',
    searchTermsBinding: 'controllers.serp.searchTerms',

    actions: {
        prepBulk: function () {
            var data, that = this;
            data = Em.Object.create({
                query: App.Asset.create(this.get('searchTerms.asset')),
                kstarget: App.Kickstart.create({
                    id: this.get('kickstarts').findBy(
                        'name',
                        this.get('kickstart')
                    ).id
                }),
                layout: App.Layout.create({
                    partlayout_id:
                        this.get('layouts').findBy(
                            'name',
                            this.get('layout')
                        ).partlayout_id
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
        return (this.get('layout') && this.get('kickstart') ? true : false);
    }.property('layout', 'kickstart')
});