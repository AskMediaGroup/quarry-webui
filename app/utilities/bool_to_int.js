/*global App, Em */
App.boolToInt = function (bool) {
    if (bool === true) {
        return 1;
    }
    return 0;
};

