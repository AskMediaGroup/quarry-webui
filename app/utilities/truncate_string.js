/*global App */
App.truncateStringAtWord = function (str, maxLength) {
    /**
     * Takes a string of and a max character length, and truncates it to be
     * less than or equal to the max length, preserving words; and only
     * considering the first line of a multi-line string */
    var stringWords, truncatedString, i, wordLen;
    if (str) {
        if (/\n/.exec(str)) {
            // If the string contains a newline, we only care about the first line
            str = str.split('\n')[0];
        }
        if (str.length > maxLength) {
            stringWords = str.split(' ');
            // If we can't even fit the first word into a string that fulfills the
            // maxLength requirement we'll return an empty string
            if (stringWords[0].length > maxLength) {
                return '';
            }
            // Otherwise we'll return as many words as fit under the maxLength
            truncatedString = '';
            for (i = 0, wordLen = stringWords.length; i < wordLen; i += 1) {
                if (truncatedString.length + stringWords[i].length <= maxLength) {
                    truncatedString = truncatedString.concat(stringWords[i] + ' ');
                }
            }
            return truncatedString;
        }
        return str;
    }
    return '';
};

