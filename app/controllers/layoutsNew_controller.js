/*global App, Em */
App.LayoutsNewController = Em.ObjectController.extend({
    content: {},

    actions: {
        add: function () {
            var that = this;
            this.setProperties({
                nameAlert: this.get('missingName')
            });
            if (this.get('validated')) {
                this.setProperties({
                    nameAlert: null
                });
                App.Layouts.add(
                    App.Layouts.create({
                        name: this.get('name'),
                        base: this.get('isBase') ? 1 : 0,
                        available: this.get('isAvailable') ? 1 : 0,
                        swraid: this.get('isSwRaid') ? 1 : 0
                    })
                ).then(
                    function success(response) {
                        that.setProperties({
                            content: response,
                            status: { added: true }
                        });
                    },
                    function failure(response) {
                        that.set('status', { added: false });
                    }
                );
            }
        },
        edit: function () {
            var that = this;
            App.Layouts.find(this.get('layout_id')).then(
                function (response) {
                    that.transitionToRoute('layout', response);
                }
            );
        },
        retry: function () {
            this.set('status', undefined);
        },
        cancel: function () {
            this.transitionToRoute('layouts');
        }
    },

    missingName: function () {
        return this.get('name') ? false : true;
    }.property('name'),

    validated: function () {
        return (!this.get('missingName'));
    }.property('missingName')
});
