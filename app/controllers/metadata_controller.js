/*global console, App, Em, $, setInterval */
App.MetadataController = Em.ArrayController.extend({
    content: [],
    needs: ['application'],

    childOutlet: function () {
        return this.get('controllers.application').get(
            'currentPath'
        ) === 'metadata.new';
    }.property('controllers.application.currentPath'),

    actions: {
        delMetadatum: function (metadatum) {
            this.transitionToRoute('metadatum.delete', metadatum);
        }
    },

    sorted: function () {
        return this.get('content').sortBy('name');
    }.property('content.@each.name'),

    find: function () {
        var that = this;
        this.set('isLoading', true);
        return App.Meta.find().then(function (metadata) {
            that.setProperties({
                isLoading: false,
                loaded: true
            });
            return metadata;
        });
    },

    refresh: function () {
        var that = this;
        this.find().then(function (metadata) {
            that.set('content', metadata);
        });
    }
});