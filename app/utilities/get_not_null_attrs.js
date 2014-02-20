/*global App, Em */
App.getNotNullAttrs = function (obj) {
    var newObj, key;
    newObj = {};
    for (key in obj) {
        // Strip out inherited attributes
        if (obj.hasOwnProperty(key)) {
            // Strip out null and undefined
            if (!Em.isNone(obj.get(key))) {
                newObj[key] = obj.get(key);
            }
        }
    }
    return newObj;
};

