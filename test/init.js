/*globals document, console, Em, App, Quarry, Mantel, $ */
/**
 * Initialize for testing!
 * This is how we bootstrap the App for unit and integration tests
 * @namespace init-dot-js
 */
$(document.body).append('<div id="ember-testing-container"><div id="ember-testing"></div></div>');
App.rootElement = '#ember-testing';
App.setupForTesting();
App.injectTestHelpers();
Quarry.Meta.find('QUARRY_UI').then(
    function (data) {
        $.each(data.value.constants, function (i, constantObj) {
            var name;
            for (name in constantObj) {
                if (constantObj.hasOwnProperty(name)) {
                    App.set(name, constantObj[name]);
                }
            }
        });
    }
);
$.getScript('base/js/models.js');