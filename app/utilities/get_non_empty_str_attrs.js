/*global App, Em */
App.getNonEmptyAttrs = function (obj) {
    var key, newObj = {};
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof (obj[key]) === 'string') {
                if (obj[key].length > 0) {
                    newObj[key] = obj[key];
                }
            } else if (typeof (obj[key]) === 'number') {
                newObj[key] = obj[key];
            }
        }
    }
    return newObj;
};

