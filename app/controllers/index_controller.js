/*global console, App, Quarry, Em, $ */
App.IndexController = Em.ObjectController.extend({
    content: {},
    needs: 'cloudStats',
    cloudBinding: 'controllers.cloudStats.cloud'
});