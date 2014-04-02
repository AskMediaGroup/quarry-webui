/*global App, Em */
App.LayoutController = Em.ObjectController.extend({
    content: {},
    needs: ['application'],
    newEntries: [],

    actions: {
        refresh: function () {
            var that = this;
            App.Layout.find(this.get('partlayout_id')).then(
                function (response) {
                    that.setProperties({
                        content: response,
                        isBase: response.base ? true : false,
                        isAvailable: response.available ? true : false,
                        isSwRaid: response.swraid ? true : false,
                        status: undefined
                    });
                    that.get('entries').forEach(function (item, index, enumerable) {
                        Em.set(item, 'willGrow', item.grow === 1);
                    });
                    that.set('formUpdated', false);
                }
            );
        },
        addEntry: function () {
            this.get('newEntries').pushObject(Em.Object.create({
                fs: '',
                level: undefined,
                mnt: '',
                dev: '',
                order: '',
                grow: 0,
                size: undefined
            }));
        },

        delNewEntry: function (entry) {
            this.get('newEntries').removeObject(entry);
        },
        delEntry: function (entry_id) {
            var that = this;
            App.Layout.findEntry(this.get('partlayout_id'), entry_id).then(
                function (response) {
                    that.transitionToRoute(
                        'layoutEntry.delete',
                        App.LayoutEntry.create(response)
                    );
                }
            );
        },
        update: function () {
            var entries, layout, that = this;
            entries = [];
            this.get('entries').forEach(function (item, index, enumerable) {
                entries.pushObject({
                    partlayoutentry_id: item.partlayoutentry_id,
                    partlayout_id: item.partlayout_id,
                    fs: item.fs || undefined,
                    level: +item.level || undefined,
                    mnt: item.mnt || undefined,
                    dev: item.dev || undefined,
                    order: +item.order || undefined,
                    grow: item.willGrow ? 1 : 0,
                    size: +item.size || undefined
                });
            });
            this.get('newEntries').forEach(function (item, index, enumerable) {
                App.Layout.addEntry(
                    that.get('partlayout_id'),
                    App.getNonEmptyAttrs(App.LayoutEntry.create({
                        fs: item.fs || undefined,
                        level: +item.level || undefined,
                        mnt: item.mnt || undefined,
                        dev: item.dev || undefined,
                        order: +item.order || undefined,
                        grow: item.willGrow ? 1 : 0,
                        size: +item.size || undefined
                    }))
                );
            });
            layout = App.Layout.create({
                partlayout_id: this.get('partlayout_id'),
                name: this.get('name'),
                base: this.get('isBase') ? 1 : 0,
                available: this.get('isAvailable') ? 1 : 0,
                swraid: this.get('isSwRaid') ? 1 : 0,
                entries: entries
            });
            App.Layout.update(
                this.get('partlayout_id'),
                layout
            ).then(
                function success(response) {
                    that.setProperties({
                        status: { updated: true },
                        newEntries: []
                    });
                },
                function failure(response) {
                    that.set('status', { updated: false });
                }
            );
        },
        remove: function () {
            this.transitionToRoute('layout.delete', this.get('content'));
        }
    },

    formObserver: function () {
        this.set('formUpdated', true);
    }.observes('partlayout_id', 'name', 'isBase', 'isAvailable',
        'isSwRaid', 'entries.@each.order', 'entries.@each.fs',
        'entries.@each.mnt', 'entries.@each.size', 'entries.@each.willGrow',
        'entries.@each.level', 'entries.@each.dev'),

    newEntriesObserver: function () {
        if (this.get('newEntries').length > 0) {
            this.set('formUpdated', true);
        }
    }.observes('newEntries.@each'),

    deleteInProgress: function () {
        var routePath = this.get('controllers.application').get('currentPath');
        return routePath === 'layout.layoutEntry.delete' ||
            routePath === 'layout.delete';
    }.property('controllers.application.currentPath')
});
