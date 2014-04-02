/*global Em, Handlebars, document, console, Blob, Quarry, Mantel, QuarryTest, $ */
/** Quarry UI
 * Ember.js Application instance object - the "global" namespace
 * @namespace {Ember.Application} Appj
 * @instance
 */
var App = Em.Application.create(
    /** @lends App.prototype */
    {
        /**
         * This will be invoked after app initialization
         */
        ready: function () {
            /*jslint nomen: true*/
            if (!Quarry.TESTING) {
                this.__container__.lookup(
                    'controller:jobs'
                ).registerAutoJobCheck();
                this.__container__.lookup(
                    'controller:cardstacks'
                ).registerAutoCardstacksLoad();
            }
            /*jslint nomen: false*/
        },

        /** Log transitions?
         * @type {boolean}
         * @constant
         */
        LOG_TRANSITIONS: false,

        /**
         * Load application metadata
         */
        loadMetadata: function () {
            var that = this;
            return Quarry.Meta.find('QUARRY_UI').then(
                function (data) {
                    $.each(data.value.constants, function (i, constantObj) {
                        var name;
                        for (name in constantObj) {
                            if (constantObj.hasOwnProperty(name)) {
                                that.set(name, constantObj[name]);
                            }
                        }
                    });
                }
            );
        }
    }
);
Em.Application.initializer({
    name: 'quarry-api',
    /**
     * Vestigial, horrible authentication pattern
     * Please clean me up!!
     */
    initialize: function (container, application) {
        if (!Quarry.TESTING) {
            App.deferReadiness();
            Quarry.configure(function () {
                Quarry.authenticated(function () {
                    Quarry.mantelSetup(function () {
                        Mantel.register(Quarry.api, function (result) {
                            Quarry.apiSetup(result, function () {
                                App.loadMetadata().then(
                                    function () {
                                        App.advanceReadiness();
                                    }
                                );
                            });
                        });
                    });
                });
            });
        }
    }
});
Em.Application.initializer({
    name: 'loadModels',
    after: 'quarry-api',
    initialize: function (container, application) {
        if (!Quarry.TESTING) {
            App.deferReadiness();
            $.getScript('js/models.min.js').done(
                function () {
                    App.advanceReadiness();
                }
            );
        }
    }
});