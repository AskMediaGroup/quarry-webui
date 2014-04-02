/*global App, Em */
App.CardController = Em.ObjectController.extend({
    content: {},
    needs: ['application'],
    currentPathBinding: 'controllers.application.currentPath',

    actions: {
        reload: function () {
            this.refresh();
        },
        update: function () {
            var metadata, that = this;
            metadata = App.CardUpdate.create({
                name: this.get('name'),
                command: this.get('command')
            });
            App.Card.update(this.get('card_id'), metadata).then(
                function (response) {
                    that.set('formUpdated', false);
                    that.transitionToRoute('card.index');
                }
            );
        },
        remove: function () {
            this.transitionToRoute('card.delete', this.get('content'));
        }
    },

    refresh: function () {
        var that = this;
        App.Card.find(this.get('card_id')).then(
            function (response) {
                that.setProperties({
                    content: response,
                    status: undefined
                });
                that.set('formUpdated', false);
                that.transitionToRoute('card.index');
            }
        );
    },

    formObserver: function () {
        this.set('formUpdated', true);
    }.observes('name', 'command'),

    deleteState: function () {
        return this.get('currentPath') === 'card.delete' ? true : false;
    }.property('currentPath'),

    deleteInProgress: function () {
        return this.get('currentPath') === 'card.delete';
    }.property('currentPath')
});
