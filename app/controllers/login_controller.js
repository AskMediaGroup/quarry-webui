/*global App, Quarry, Em, Mantel, $ */
/**
 * The Login Controller
 * @class App.LoginController
 * @extends Em.ObjectController
 * @classdesc acquire authentication cookies
 */
App.LoginController = Em.ObjectController.extend(
    /** @lends App.LoginController.prototype */
    {
        /**
         * The model object
         * @type {Object}
         */
        content: {},
        /**
         * Controller dependencies
         * @type {Array}
         * @constant
         * */
        needs: ['application'],

        /**
         * The actions hash
         * @type {Object}
         */
        actions: {
            authenticate: function () {
                var that = this;
                this.setProperties({
                    authenticating: true,
                    rejected: false,
                    cookieError: false,
                    apiError: false,
                    loadingAppData: false
                });
                // Get a user secret from the API
                Quarry.User.getSecret(
                    this.get('userid'),
                    this.get('password')
                ).then(
                    that.gotSecretCallback(that),
                    that.errorCallback(that)
                );
            }
        },
        gotSecretCallback: function (that) {
            return function (secret) {
                that.setProperties({
                    rejected: false,
                    authenticating: false
                });
                if (Quarry.creds.storeCredentials(that.get('userid'), secret)) {
                    if (Quarry.creds.setStoredCredentials()) {
                        App.set('credentialsLoaded', true);
                        that.set('loadingAppData', true);
                        App.loadMetadata().then(
                            function () {
                                App.loadModels().done(
                                    function () {
                                        that.set('loadingAppData', false);
                                        that.transitionToRoute('index');
                                    }
                                );
                            }
                        );
                    } else {
                        App.set('credentialsLoaded', false);
                    }
                } else {
                    that.set('cookieError', true);
                }
            };
        },
        errorCallback: function (that) {
            return function (jqXHR) {
                if (jqXHR.status === 401) {
                    that.set('rejected', true);
                    that.set('authenticating', false);
                } else if (jqXHR.status === 404) {
                    Quarry.User.createSecret(
                        that.get('userid'),
                        that.get('password')
                    ).then(
                        that.gotSecretCallback(that),
                        function failure(jqXHR) {
                            console.log(jqXHR);
                        }
                    );
                }  else {
                    that.set('apiError', true);
                }
            };
        }
    }
);
