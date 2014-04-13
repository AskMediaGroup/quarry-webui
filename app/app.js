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
            if (!Quarry.TESTING && Quarry.api) {
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
        /** Where to find model objects
         * @type {String}
         * @constant
         */
        MODELS_PATH: 'js/models.min.js',
        /**
         * Load application metadata
         */
        loadMetadata: function () {
            var that = this;
            return Quarry.Meta.find('QUARRY_UI').then(
                function (data) {
                    var i, k, name;
                    for (i = 0, k = data.value.constants.length;i < k; i += 1) {
                        for (name in data.value.constants[i]) {
                            if (data.value.constants[i].hasOwnProperty(name)) {
                                that.set(name, data.value.constants[i][name]);
                            }
                        }
                    }
                }
            );
        },
        loadModels: function () {
            return $.getScript(App.MODELS_PATH);
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
        App.set('credentialsLoaded', false);
        if (!Quarry.TESTING) {
            App.deferReadiness();
            // Set basic API config: URL/port
            Quarry.configureApi(Quarry.BACKEND).then(
                function () {
                    // Try to load credentials from persistent client cookie
                    if (Quarry.creds.setStoredCredentials()) {
                        // Credentials successfully loaded from cookie!
                        App.set('credentialsLoaded', true);
                        App.loadMetadata().then(
                            function () {
                                App.loadModels().done(
                                    function () {
                                        App.advanceReadiness();
                                    }
                                );
                            }
                        );
                    } else {
                        // Credentials not found in cookie, App will
                        // automatically transition to login route state based
                        // on the false value of App.credentialsLoaded
                        App.advanceReadiness();
                    }
                }
            );
        }
    }
});