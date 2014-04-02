/*global App, Em */
App.MetadatumController = Em.ObjectController.extend({
    content: {},
    needs: ['application'],
    currentPathBinding: 'controllers.application.currentPath',

    actions: {
        refresh: function () {
            var that = this;
            this.set('isLoading', true);
            App.Meta.find(this.get('name')).then(
                function (metadatum) {
                    that.set('content', metadatum);
                    that.setProperties({
                        isLoading: false,
                        formUpdated: false
                    });
                }
            );
        },
        update: function () {
            var that = this;
            if (JSON.parse(this.get('stringified'))) {
                App.Meta.update(
                    this.get('name'),
                    {
                        value: JSON.parse(this.get('stringified')),
                        gen: this.get('gen')
                    }
                ).then(
                    function (metadatum) {
                        that.set('content', metadatum);
                        that.set('formUpdated', false);
                    }
                );
            }
        },
        remove: function () {
            this.transitionToRoute('metadatum.delete');
        }
    },

    formObserver: function () {
        this.set('formUpdated', true);
    }.observes('stringified'),

    deleteInProgress: function () {
        return this.get('controllers.application').get(
            'currentPath'
        ) === 'metadatum.delete';
    }.property('controllers.application.currentPath')
});
