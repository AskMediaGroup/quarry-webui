/*global App, Em, document, $ */
/*jslint nomen: true*/
App.OnClickSelectRevealer = Em.View.extend({
    classNames: ['ember-text-field'],
    tagName: "input",
    attributeBindings: ['type', 'value', 'size', 'pattern', 'name', 'min',
        'max', 'reveal'],
    type: 'text',

    init: function() {
        this._super();
        this.on("click", this, this._updateElementValue);
    },

    _updateElementValue: function() {
        Em.set(this, 'reveal', true);
    }
});
/*jslint nomen: false*/