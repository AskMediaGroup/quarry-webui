/*global App, Em */
App.getNonEmptyArrIndices = function (arr) {
    var newArr = [];
    arr.forEach(function (item, index, enumerable) {
        if (item.get('ip')) {
            newArr.push(item);
        }
    });
    return newArr;
};

