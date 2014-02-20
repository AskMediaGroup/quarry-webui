/*globals module, test, asyncTest, start, equal, expect, ok, visit, find,
          console, Em, App, Quarry, $ */
module('App.Card', {
    setup: function () {
        this.card = App.Card.create({
            card_id: 1,
            name: 'test script',
            content_oid: '012345678901234567890123',
            command: '#!/bin/bash\n' +
                'find /proc\n' +
                'cat /etc/fstab\n' +
                'free -m\n' +
                '/etc/init.d/cron status'
        });
    },
    teardown: function () {
        Em.run(this.card, 'destroy');
    }
});

test('computed properties', function () {
    expect(1);
    equal(this.card.get('command_abbreviated').length, 11,
        'App.Card.command_abbreviated() computed property failed!');
});