/*globals module, test, asyncTest, start, equal, expect, ok, visit, find,
          console, Em, App, Quarry, $ */
module('App.Cardstack', {
    setup: function () {
        this.cardstack = App.Cardstack.create();
    },
    teardown: function () {
        Em.run(this.cardstack, 'destroy');
    }
});

test('exists', function () {
    expect(1);
    ok(this.cardstack.get('cards'));
});