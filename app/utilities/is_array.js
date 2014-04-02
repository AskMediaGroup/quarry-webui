/*global App, Em */
/* A helper function to determine if an Ember.Controller's
   'content' object is empty
*/
App.isArray = function (object) {
    return Object.prototype.toString.call(object) === '[object Array]';
};
