/*global App, Em */
App.MetadataNewController = Em.ObjectController.extend({
    content: {},

    actions: {
        add: function () {
            var that = this;
            this.setProperties({
                nameAlert: this.get('missingName'),
                valueAlert: this.get('missingGateway')
            });
            if (this.get('validated')) {
                this.setProperties({
                    nameAlert: null,
                    valueAlert: null
                });
                if (JSON.parse(this.get('value'))) {
                    App.Meta.add(
                        {
                            name: this.get('name'),
                            value: JSON.parse(this.get('value'))
                        }
                    ).then(
                        function (metadatum) {
                            that.transitionToRoute('metadatum', metadatum);
                        }
                    );
                }
            }
        },
        edit: function () {
            var that = this;
            App.Meta.find(this.get('name')).then(
                function (response) {
                    that.transitionToRoute('metadata', response);
                }
            );
        },
        retry: function () {
            this.set('status', undefined);
        },
        cancel: function () {
            this.transitionToRoute('metadata');
        }
    },

    missingName: function () {
        return this.get('name') ? false : true;
    }.property('name'),

    missingValue: function () {
        return this.get('value') ? false : true;
    }.property('value'),

    validated: function () {
        return (!this.get('missingName') &&
            !this.get('missingValue'));
    }.property('missingName', 'missingValue')
});
