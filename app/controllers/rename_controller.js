/*global App, Em */
App.RenameController = Em.ArrayController.extend({
    content: [],
    needs: ['confirmation'],
    readyBinding: 'controllers.confirmation.ready',

    actions: {
        confirm: function () {
            this.set('confirming', true);
            this.get('controllers.confirmation').reset();
        },
        rename: function () {
            this.get('content').forEach(function (item, index, enumerable) {
                App.Mortar.rename(
                    item.get('id'),
                    item.get('newName').toLowerCase() + App.DOMAIN_SUFFIX,
                    item.get('reboot')
                ).then(function (response) {
                    return App.Job.create(response);
                });
            });
            this.transitionToRoute('jobs');
        },
        cancel: function () {
            this.setProperties({
                confirming: false,
                content: []
            });
            this.transitionToRoute('serp.index');
        }
    },

    optionsReady: function () {
        return this.get('content').everyProperty('newName');
    }.property('content.@each.newName')
});
