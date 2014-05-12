/*global console, App, Quarry, Em, $ */
App.VipController = Em.ObjectController.extend({
    content: {},
    needs: ['bigIp'],

    actions: {
        lastSearch: function () {
            if (this.get('controllers.bigIp.lastSearch') === 'vip') {
                this.transitionToRoute('bigIp');
            } else if (this.get('controllers.bigIp.lastSearch') === 'dc') {
                this.get('controllers.bigIp').searchDcs();
            } else {
                this.transitionToRoute('bigIp');
            }
        }
    },

    refresh: function () {
        var that = this;
        this.set('isLoading', true);
        App.BigIp.findByName(this.get('name')).then(
            function (vip) {
                that.set('content', vip);
                that.set('isLoading', false);
            }
        );
    }
});