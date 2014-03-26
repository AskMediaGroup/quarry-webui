// ==========================================================================
// Project:  mantel.js
// Copyright: ©2012 Ask.com
// TODO: Please Replace Me!
// ==========================================================================

/**
 <p>All Mantel methods and functions are defined inside of this namespace.</p>

 @namespace
 @name Mantel
 @version 0.1.0
 */
Mantel = {
    isNamespace: true,
    toString: function() {
        return "Mantel";
    },

    /**
     <p>Register a connection with the server</p>

     @example
     var connection = new Mantel.Connection(host,port,userid,passwd);
     Mantel.register(connection, callback);

     @param {connection} connection
     @param {callback} callback

     @returns {callback}
     */
    register: function (connection, callback) {

        //TODO: if a key is already provided validate the key.
        // There is no API for this action
        if (connection.getSecret() != null) {
            callback({
                'authenticated': true,
                'secret': connection.getSecret()
            });
        }
        else {
            Mantel.acquireExistingSecret(connection, function(existingSecret) {
                if (existingSecret) {
                    connection.setSecret(existingSecret);
                    Mantel.acquireSignature(connection, function(signature) {
                        if (signature != null) {
                            connection.setSignature(signature);
                            if (connection.getSecret().length > 1
                                && connection.getSignature().length > 1) {
                                callback({
                                    'authenticated':true,
                                    'secret':connection.getSecret()
                                });
                            }
                            else {
                                callback({
                                    'authenticated':false
                                });
                            }
                        } else {
                            callback({
                                'authenticated':false
                            });
                        }
                    });
                }
                else {
                    Mantel.acquireNewSecret(connection, function(secret) {
                        if (!secret) {
                            callback({
                                'authenticated':false
                            });
                        }
                        if (secret) {
                            connection.setSecret(secret);
                            Mantel.acquireSignature(connection, function(signature) {
                                if (signature) {
                                    connection.setSignature(signature);
                                    if (connection.getSecret().length > 1
                                        && connection.getSignature().length > 1) {
                                        callback({
                                            'authenticated':true,
                                            'secret':connection.getSecret()
                                        });
                                    } else {
                                        callback({
                                            'authenticated':false
                                        });
                                    }
                                } else {
                                    callback({
                                        'authenticated':false
                                    });
                                }
                            });
                        }
                        else {
                            callback({
                                'authenticated':false
                            });
                        }

                    });
                }
            });
        }
    },


    /**
     Check for an existing auth secret on the server

     @private
     @param {connection} connection
     @param {callback} callback

     @returns {callback}
     */
    acquireExistingSecret: function(connection, callback) {
        var targetUrl = "http://" + connection.getHost() + ":" + connection.getPort() + "/users/secret";
        var userJson = '{"user":"' + connection.getUserid() + '","passwd":"' + connection.getPasswd() + '"}';

        var jqxhr = $.ajax({
            type: 'POST',
            url: targetUrl,
            data: userJson,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if(data.data[0] === null) {
                    return callback(false);
                }
                else {
                    return callback(data.data[0].secret);
                }
            },
            error: function(data, textStatus, jqXHR) {
                return callback(null);
            },
            dataType: "json"
        });
    },


    /**
     Get a new auth secret on the server

     @private
     @param {connection} connection
     @param {callback} callback

     @returns {callback}
     */
    acquireNewSecret: function(connection,callback) {
        var targetUrl = "http://" + connection.getHost() + ":" + connection.getPort() + "/users/secret";
        var userJson = '{"user":"' + connection.getUserid() + '","passwd":"' + connection.getPasswd() + '"}';

        var jqxhr = $.ajax({
            type: 'PUT',
            url: targetUrl,
            data: userJson,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if(data.data[0] === null) {
                    return callback(false);
                }
                else {
                    return callback(data.data[0].secret);
                }
            },
            error: function(data, textStatus, jqXHR) {
                console.log("acquireNewSecret Error: " + textStatus);
            },
            dataType: "json"
        });
    },


    /**
     Generate the signature based on the secret

     @private
     @param {connection} connection
     @param {callback} callback

     @returns {callback}

     @depricated
     */
    acquireSignature: function(connection, callback) {
        var epoch = parseInt(new Date().getTime() / 1000, 10);
        var sigComponents = connection.getUserid() + connection.getSecret() + epoch;
        var signature = CryptoJS.SHA256(sigComponents);
        return callback(signature);
    },

    /**
     Generate the signature based on the secret

     @private
     @param {connection} connection
     @param {callback} callback

     @returns {String} signature

     @depricated
     */
    generateSignature: function(connection) {
        var epoch = parseInt(new Date().getTime() / 1000, 10);
        var sigComponents = connection.getUserid() + connection.getSecret() + epoch;
        return CryptoJS.SHA256(sigComponents);
    },



    /**
     <p>Debug: ping the server api</p>

     @param {connection} connection
     @param {callback} callback

     @returns {callback}
     */
    debugPing: function(connection, callback) {
        var targetUrl = "http://" + connection.getHost() + ":" + connection.getPort() + "/debug/ping";

        var jqxhr = $.ajax({
            type: 'GET',
            url: targetUrl,
            contentType: "application/json; charset=utf-8",
            success: function (data) { return callback(data); },
            error: function(data, textStatus, jqXHR) {
                console.log("debugPing Error: " + textStatus);
            },
            dataType: "json"
        });
    },

    /**
     <p>Debug: test authentication</p>

     @param {connection} connection
     @param {callback} callback

     @returns {callback}
     */
    debugAuth: function(connection, callback) {
        var targetUrl = "http://" + connection.getHost() + ":" + connection.getPort() + "/debug/auth";

        var jqxhr = $.ajax({
            type: 'GET',
            url: targetUrl + "?key="+connection.getUserid()+"&sig="+connection.getSignature(),
            contentType: "application/json; charset=utf-8",
            success: function (data) { return callback(data); },
            error: function(data, textStatus, jqXHR) {
                console.log("debugAuth Error: " + data.statusText + ":" + data.responseText);
            },
            dataType: "json"
        });
    },


    /**
     <p>Debug: test user is an ops user</p>

     @param {connection} connection
     @param {callback} callback

     @returns {callback}
     */
    debugOps: function(connection, callback) {
        var targetUrl = "http://" + connection.getHost() + ":" + connection.getPort() + "/debug/ops";

        var jqxhr = $.ajax({
            type: 'GET',
            url: targetUrl + "?key="+connection.getUserid()+"&sig="+connection.getSignature(),
            contentType: "application/json; charset=utf-8",
            success: function (data) { return callback(data); },
            error: function(data, textStatus, jqXHR) {
                console.log("debugOps Error: " + data.statusText + ":" + data.responseText);
            },
            dataType: "json"
        });
    }

};

/**
 @class

     <p>A Mantel connection object. Holds the connection settings and results.</p>

 @example var connection = new Mantel.Connection("host",8080,"Doej","superpass");

 @name Mantel.Connection
 @param {String} host Host name
 @param {Number} port Host port number
 @param {String} userid Userid
 @param {String} password Password
 @returns {Object} Mantel.Connection
 */
Mantel.Connection = function (host, port, userid, passwd) {
    _host = host;
    _port = port;
    _userid = userid;
    _passwd = passwd;
    _secret = null;
    _signature = null;

    /**
     Get the configured host name

     @private
     @returns {String} The configured host name
     */
    this.getHost = function () {
        return _host;
    };

    /**
     Set the host name

     @private
     @param {String} Host name
     @returns {void}
     */
    this.setHost = function (host) {
        _host = host;
    };

    /**
     Get the configured host port number

     @private
     @returns {Number} The configured host port number
     */
    this.getPort = function () {
        return _port;
    };

    /**
     Set the host port number

     @private
     @param {number} Port number
     @returns {void}
     */
    this.setPort = function (port) {
        _port = port;
    };

    /**
     Get the configured userid

     @private
     @returns {String} The configured userid
     */
    this.getUserid = function () {
        return _userid;
    };

    /**
     Set the userid

     @private
     @param {String} userid
     @returns {void}
     */
    this.setUserid = function (userid) {
        _userid = userid;
    };

    /**
     Get the configured password

     @private
     @returns {String} The configured password
     */
    this.getPasswd = function () {
        return _passwd;
    };

    /**
     Set the password

     @private
     @param {String} password
     @returns {void}
     */
    this.setPasswd = function (passwd) {
        _passwd = passwd;
    };

    /**
     Get the secret

     @private
     @returns {String} hash
     */
    this.getSecret = function () {
        return _secret;
    };

    /**
     Set the secret

     @private
     @param {String} secret
     @returns {void}
     */
    this.setSecret= function (secret) {
        _secret = secret;
    };

    /**
     Get the signature

     @private
     @returns {String} signature
     */
    this.getSignature = function () {
        return Mantel.generateSignature(this);
    };

    /**
     Set the signature

     @private
     @param {String} signature
     @returns {void}
     */
    this.setSignature= function (signature) {
        _signature = signature;
    };


};










