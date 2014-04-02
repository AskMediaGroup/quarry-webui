/*global App, Em, $, document */
// Display the current version number when hovering of the Quarry title
App.VersionView = Em.View.extend({
    attributeBindings: ['rel', 'data-content', 'data-original-title'],
    'rel': 'popover',
    'data-original-title': 'Quarry Version Info',
    'data-content': 'Version DEFAULT',

    didInsertElement: function () {
        $('#quarryLogo').popover({
            placement: 'bottom',
            trigger: 'hover'
        });
    },

    mouseEnter: function () {
        document.body.style.cursor = 'pointer';
    },

    mouseLeave: function () {
        document.body.style.cursor = 'default';
    }
});
