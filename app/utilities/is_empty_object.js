/*global App */
App.isEmptyObject = function (object) {
    var key;
    for (key in object) {
        if (object.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
};

