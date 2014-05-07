/*global App, Em */
App.LayoutController = Em.ObjectController.extend({
    content: {},
    needs: ['application'],
    newEntries: [],

    actions: {
        refresh: function () {
            var that = this;
            App.Layouts.find(this.get('layout_id')).then(
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
                size: undefined,
                layout_id: this.get('layout_id')
            }));
        },

        delNewEntry: function (entry) {
            this.get('newEntries').removeObject(entry);
        },
        delEntry: function (entry_id) {
            var that = this;
            App.LayoutEntries.find(entry_id).then(
                function (layoutEntry) {
                    that.transitionToRoute(
                        'layoutEntry.delete',
                        App.LayoutEntries.create(layoutEntry)
                    );
                }
            );
        },
        update: function () {
            var layout, that = this;
            this.get('entries').forEach(function (item, index, enumerable) {
                App.LayoutEntries.update(
                    item.entry_id, App.getNonEmptyAttrs(App.LayoutEntries.create({
                        entry_id: item.entry_id,
                        fs: item.fs || undefined,
                        level: item.level === undefined
                            ? undefined
                            : +item.level,
                        mnt: item.mnt || undefined,
                        dev: item.dev || undefined,
                        order: +item.order || undefined,
                        grow: item.willGrow ? 1 : 0,
                        size: +item.size || undefined,
                        layout_id: that.get('layout_id')
                    }))
                );
            });
            this.get('newEntries').forEach(function (item, index, enumerable) {
                App.LayoutEntries.add(
                    App.getNonEmptyAttrs(App.LayoutEntries.create({
                        fs: item.fs || undefined,
                        level: item.level === undefined
                            ? undefined
                            : +item.level,
                        mnt: item.mnt || undefined,
                        dev: item.dev || undefined,
                        order: +item.order || undefined,
                        grow: item.willGrow ? 1 : 0,
                        size: +item.size || undefined,
                        layout_id: that.get('layout_id')
                    }))
                );
            });
            layout = App.Layouts.create({
                layout_id: this.get('layout_id'),
                name: this.get('name'),
                base: this.get('isBase') ? 1 : 0,
                available: this.get('isAvailable') ? 1 : 0,
                swraid: this.get('isSwRaid') ? 1 : 0
            });
            App.Layouts.update(this.get('layout_id'), layout).then(
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
    }.observes('layout_id', 'name', 'isBase', 'isAvailable',
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
