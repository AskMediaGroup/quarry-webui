/*global App, Em, document, $, setInterval */
App.JobView = Em.View.extend({

    didInsertElement: function () {
        // We only want to call SetInterval once
        if (!App.cursorBlinkId) {
            App.cursorBlinkId = setInterval(function () {
                $('.blink').toggleClass('cursorOn');
            }, 500);
        }
    }
});