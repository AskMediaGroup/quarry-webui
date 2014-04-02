/*global App, Em */
App.IndexController = Em.ObjectController.extend({
    content: {},
    needs: 'cloudStats',
    cloudBinding: 'controllers.cloudStats.cloud'
});
