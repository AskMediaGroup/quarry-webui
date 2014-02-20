/*global App, Quarry, Em, DS, $ */
App.Card = Quarry.Card.extend({
    command_abbreviated: function () {
        return App.truncateStringAtWord(this.get('command'), 50);
    }.property('command')
});