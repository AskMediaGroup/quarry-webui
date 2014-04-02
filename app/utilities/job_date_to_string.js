/*global App, Em */
App.jobDateToString = function (epochSeconds) {
    /**
     * Returns a friendly date string
     * Includes a "Today @" or "Yesterday @" prefix, if appropriate
     * @param {number} epochSeconds Epoch time in seconds
     * @returns {string} Friendly date string
     */
    var dateStringArray, now, jobDate, ONE_DAY = 60 * 60 * 24 * 1000;
    // Using an array to compose the string to avoid string concatenation
    dateStringArray = [];
    now = new Date();
    jobDate = new Date(epochSeconds * 1000);

    if (now - jobDate < ONE_DAY) {
        dateStringArray.push('Today @ ', jobDate.toTimeString());
    } else if (now - jobDate < (ONE_DAY * 2)) {
        dateStringArray.push('Yesterday @ ', jobDate.toTimeString());
    } else {
        dateStringArray.push(jobDate.toString());
    }
    return dateStringArray.join('');
};
