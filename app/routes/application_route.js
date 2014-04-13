/*global App, Em */
App.ApplicationRoute = Em.Route.extend({
    beforeModel: function(transition) {
        if (!App.credentialsLoaded) {
            this.transitionTo('login');
        }
    }
});
