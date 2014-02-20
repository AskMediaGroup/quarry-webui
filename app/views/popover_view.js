/*global App, Em, $ */
// Setup Bootstrap Popovers!
App.PopoverView = Em.View.extend({
    didInsertElement: function () {
        $('[rel="popover"]').popover({
            trigger: "click",
            html: true
        });
    }
});