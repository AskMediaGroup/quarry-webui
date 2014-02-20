/*global App */
/* A helper function to determine if an Ember.Controller's
   'content' object is empty
*/
App.isEmptyContent = function (object) {
    var key;
    for (key in object) {
        if (object.hasOwnProperty(key)) {
            if (object[key] !== null && object[key] !== undefined) {
                if (object[key].length > 0 || object[key] === true ||
                        object[key] === false) {
                    return false;
                }
            }
        }
    }
    return true;
};
