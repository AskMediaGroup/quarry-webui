/*global App, Em */
/**
 * App.Meta class
 * @class App.Meta
 * @extends Quarry.Meta
 * @classdesc Meta model class
 */
App.Meta = Quarry.Meta.extend(
    /** @lends App.Meta.prototype */
    {
        stringified: function () {
            if (typeof (this.get('value')) === 'object') {
                return JSON.stringify(this.get('value'));
            } else if (typeof (this.get('value')) === 'string') {
                return '"' + this.get('value') + '"';
            } else {
                return this.get('value');
            }
        }.property('value')
    }
);
