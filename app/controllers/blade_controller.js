/*global App, Em */
App.BladeController = Em.ObjectController.extend({
    content: {},
    roles: [],

    findRoles: function () {
        var that = this;
        this.set('isLoading', true);
        return App.Blade.roles().then(
            function (response) {
                that.set('isLoading', false);
                return response;
            }
        );
    },

    refreshRoles: function () {
        var that = this;
        this.findRoles().then(
            function (response) {
                that.set('roles', response);
            }
        );
    }
});
