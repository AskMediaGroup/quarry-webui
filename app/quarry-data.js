/*global window, console, Mantel, Em, $, document */
/**
 * A metadata record model object
 * @typedef {Object} Meta
 * @property {string} name - Metadata record name
 * @property {Object} value - Metadata object
 * @property {string} type - Metadata object type
 * @property {number} gen - incrementing integer representing
 * a unique 'generation' record value
 */
/**
 * A log entries model object
 * @typedef {Object} Logs
 * @property {Array} entries - Log entries
 * @property {number} total - Total number of logs found
 */
/**
 * A Job model object
 * @typedef {Object} Job
 * @property {number} job_id Job id (mysql id)
 * @property {number} parent_id Parent job id
 * @property {number} state Job status code
 * @property {Object} output JSON output
 * @property {string} uuid Job uuid
 * @property {number} queue_time Time job was queued (epoch seconds)
 * @property {number} start_time Time job was started (epoch seconds)
 * @property {number} end_time Time job ended (epoch seconds)
 * @property {number} user_id Submitting user id (job "owner")
 * @property {string} path
 * @property {Object} tags
 * @property {string} module
 * @property {string} func Job function name
 * @property {string} args Positional args
 * @property {string} kwargs Key=value args
 * @property {Array=} children - Child jobs
 */
/**
 * A Bulk object
 * @typedef {Object} Bulk
 * @property {number} bulk_id Bulk id
 * @property {number} type Bulk type
 * @property {Object} query Asset query
 * @property {string} func Bulk function (deserialized pickle)
 * @property {string} func_name Bulk function name
 * @property {Object} args Positional args
 * @property {Object} kwargs Key=value args
 * @property {Object} assets JSON description of affected assets
 * @property {boolean} verified False=operation submitted,
 * True=Operation verified and queued
 * @property {number} user_id Submitting user
 * @property {number} verify_user_id Verifying user
 * @property {string} job_uuid UUID of resultant job (post-verification)
 */
/**
 * SearchAsset object
 * @typedef {Object} SearchAsset
 * @property {Object} asset - An asset-like object
 * @property {Array} ips - Array of ip objects
 * @property {number} limit - Maximum number of search results to return
 * @property {number} offset - Return search results beginning at this offset index
 * @property {string} sort - Search results will be sorted by this asset attribute
 * @property {boolean} desc - Sort descending?
 */
/**
 * A SERP model object
 * @typedef {Object} Serp
 * @property {Array} assets - Array of Asset objects
 * @property {number} total - Total number of assets found
 */
/**
 * An Asset model object
 * @typedef {Object} Asset
 */
/**
 * A Kickstart model object
 * @typedef {Object} Kickstart
 * @property {number} id
 * @property {number} available Boolean integer: available?
 * @property {string} name Kickstart name
 * @property {string} filename Kickstart image filename
 */
/**
 * A Vm model object
 * @typedef {Object} Vm
 * @property {number} vm_id Vm id (mysql id)
 * @property {string} name Vm FQDN
 * @property {string} hypervisor Hypervisor FQDN
 * @property {string} uuid Vm xen uuid
 * @property {string} mac Vm MAC address string
 * @property {string} type Vm type
 * @property {string} spname Storage pool name
 * @property {number} cpus Number of vCPUs
 * @property {number} memory RAM (in GiB)
 * @property {number} capacity Storage capacity (in GiB)
 * @property {number} vnc Current active VNC port
 * @property {number} created Time created in epoch seconds
 */
/**
 * A Hypervisor model object
 * @typedef {Object} Hypervisor
 * @property {string} name Hypervisor FQDN
 * @property {number} asset_id Hypervisor id
 * @property {string} type Hypervisor type
 * @property {number} storage_total Total storage (in GiB)
 * @property {number} storage_free Avail storage (in GiB)
 * @property {number} memory_total Total RAM (in GiB)
 * @property {number} memory_free Avail RAM (in GiB)
 * @property {boolean} active Active hypervisor?
 * @property {string} version Version
 * @property {Array=} vms Managed virtual hosts
 */
/**
 * A Pool object
 * @typedef {Object} Pool
 * @property {string} name Pool name
 * @property {string} type Pool type
 * @property {boolean} enabled Pool enabled?
 * @property {string} dc Datacenter locale
 * @property {string} prodtype Production Type
 * @property {string} business_unit Business Unit
 * @property {string} network Network gateway
 */
/**
 * A Network model object
 * @typedef {Object} Network
 * @property {number} network_id
 * @property {number} lom_network_id Reference to lights-out-mgmt
 * (out-of-band) network id
 * @property {string} name Network name
 * @property {string} gateway
 * @property {string} netmask
 * @property {string} dns1 Primary DNS
 * @property {string} dns2 Secondary DNS
 * @property {string} description Network description
 * @property {string} datacenter Network DC code
 */
/**
 * A Layout model object
 * @typedef {Object} Layout
 * @property {number} partlayout_id Layout id
 * @property {string} name Layout name
 * @property {number} base Boolean integer: base?
 * @property {number} available Boolean integer: available?
 * @property {number} swraid Boolean integer: Software RAID?
 */
/**
 * A Layout partition entry object
 * @typedef {Object} LayoutEntry
 * @property {number} partlayoutentry_id Layout Entry ID
 * @property {number} partlayout_id Layout ID
 * @property {number} level RAID level
 * @property {string} fs Filesystem type
 * @property {string} mnt Mount point
 * @property {string} dev Device path
 * @property {number} size Size (in MiB)
 * @property {number} grow Boolean integer:
 * increase storage size to match available add'l capacity?
 * @property {number} order Order in /etc/fstab
 */
/**
 * A Cardstack model object: a "batch job" containing scripts
 * @typedef {Object} Cardstack
 * @property {number} cardstack_id Cardstack id
 * @property {string} name Cardstack name
 * @property {Object} query Search query description
 * @property {Array.<Card>} cards Cards in the cardstack
 */
/**
 * A Card model object: a script
 * @typedef {Object} Card
 * @property {number} card_id Card id
 * @property {string} name Card name
 * @property {string} content_oid OID reference to docstore
 * @property {string} command Card command string
 */
/**
 * Script output object
 * @typedef {Object} ScriptOutput
 * @property {string} host FQDN of host that ran this script
 * @property {string} command_string Script executed
 * @property {number} code Return code
 * @property {string} stdout Stdout
 * @property {string} stderr Stderr
 */
/**
 * Command output object
 * @typedef {Object} CommandOutput
 * @property {Array.<ScriptOutput>} hosts Output array for each host
 */
/**
 * Card output object
 * @typedef {Object} CardOutput
 * @property {number} card_id Card id
 * @property {string} card_name Card name
 * @property {string} card_command Card command string
 * @property {Array.<ScriptOutput>} hosts Output array for each host
 */
/**
 * Cardstack output
 * @typedef {Object} CardstackOutput
 * @property {string} cardstack Cardstack name
 * @property {Array.<CardOutput>} cards Array of card output objects
 */
/**
 * A chef role model object
 * @typedef {Object} ChefRole
 */

/** Quarry data persistence layer
 * @namespace {Ember.Namespace} Quarry
 * @instance
 */
var Quarry = Em.Namespace.create(
    /** @lends Quarry.prototype */
    {
        /**
         * @type {boolean}
         */
        isNamespace: true,
        toString: function () {
            return "Quarry";
        },
        /** Relative link to auth app
         * @type {string}
         * @constant
         */
        AUTHENTICATE_RELATIVE_LINK: "/#/authenticate",
        /**
         * Configure Quarry
         */
        configure: function (callback) {
            var that = this;
            this.getConfig(function (config) {
                that.applyConfig(config, callback);
            });
        },
        /**
         * Get configuration data from config.json
         */
        getConfig: function (callback) {
            var config = "config.json";
            Em.$.ajax({
                type: 'GET',
                url: config,
                dataType: 'json',
                success: function (data) { return callback(data); },
                error: function (data, textStatus, jqXHR) {
                    console.log("Error retrieving config.json: " + textStatus);
                }
            });
        },
        /**
         * Apply config to Quarry namespace constants
         */
        applyConfig: function (config, callback) {
            this.WOODSTOVE_HOST = config.datasources.woodstove.host;
            this.WOODSTOVE_PORT = config.datasources.woodstove.port;
            return callback();
        },
        /**
         * Get a stored cookie by name
         */
        getCookie: function (name) {
            var nameEq, ca, i, c;
            nameEq = name + "=";
            ca = document.cookie.split(';');
            for (i = 0; i < ca.length; i += 1) {
                c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1, c.length);
                }
                if (c.indexOf(nameEq) === 0) {
                    return c.substring(nameEq.length, c.length);
                }
            }
            return null;
        },
        /**
         * Store a cookie
         */
        setCookie: function (name, value, days) {
            var expires, date;
            expires = null;
            if (days) {
                date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toGMTString();
            } else {
                expires = "";
            }
            document.cookie = name + "=" + value + expires + "; path=/";
        },
        /**
         * Determine whether or not to begin authentication process
         * (if there is a stored cookie called 'brickoven_secret'
         */
        authenticated: function (callback) {
            var secret, path, tool;
            secret = this.getCookie('brickoven_secret');
            if (!secret) {
                // Set a target tool cookie
                path = window.location.pathname.split('/');
                if (path[path.length - 1] === 'index.html') {
                    tool = path[path.length - 2];
                } else {
                    tool = path[path.length - 1];
                }
                this.setCookie('target', tool, 0);
                // redirect to the log in page
                window.location.replace(this.AUTHENTICATE_RELATIVE_LINK);
            } else {
                return callback();
            }
        },
        /**
         * Setup the Mantel instance
         */
        mantelSetup: function (callback) {
            // Setup the Mantel connection
            this.api = new Mantel.Connection(
                this.WOODSTOVE_HOST,
                this.WOODSTOVE_PORT,
                this.getCookie('brickoven_user_id'),
                ''
            );
            this.api.setSecret(this.getCookie('brickoven_secret'));
            this.api.setSignature(this.getCookie('brickoven_signature'));
            return callback();
        },
        /**
         * Bootstrap API
         */
        apiSetup: function (result, callback) {
            if (result.authenticated) {
                this.Model.reopenClass({
                    sig: function () {
                        return String(Quarry.api.getSignature());
                    },
                    key: this.api.getUserid(),
                    urlScheme: 'http://',
                    urlHost: this.api.getHost() + ':' + this.api.getPort()
                });
                Quarry.initModels();
                return callback();
            }
            console.log(
                'Could not estabalish an authenticated API connection!'
            );
        }
    }
);

/**
 * The Model object class
 * @class Quarry.Model
 * @extends Em.Object
 * @classdesc a generic model object container
 */
Quarry.Model = Em.Object.extend().reopenClass(
    /** @lends Quarry.Model.prototype */
    {
        /**
         * Generate a URI query string from an object
         * @returns {String} queryString a URL query string
         *
         * Takes an object whose properties map to URI query string names
         * and whose values should be JSON.stringified
         * e.g., { foo: 'bar' } becomes 'foo=bar'
         */
        objToUriParams: function (obj) {
            var prop, queryString = '';
            for (prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    // Ignore all non-string properties
                    if (typeof prop === "string") {
                        queryString += prop + '=';
                        if (typeof obj[prop] === "string") {
                            queryString += obj[prop] + '&';
                        } else {
                            queryString += JSON.stringify(obj[prop]) + '&';
                        }
                    }
                }
            }
            return queryString.slice(0, -1);
        },
        /**
         * Ajax convenience that respects the Ember runloop
         * @returns {Object} Ember.Deferred.promise Ember promise object
         */
        ajax: function (path, params, settings) {
            // if no params arg, initialize to an empty object
            params = params || {};
            // if no settings arg, initialize to an empty object
            settings = settings || {};
            var queryString, doAjax;
            // did we prepare a 'params' object ?
            // (or, if we didn't pass one in, we'll have an empty object)
            if (typeof params === "object") {
                params.key = this.key;
                params.sig = this.sig();
                params = this.objToUriParams(params);
            // or did we receive a manually composed url parameter string?
            } else if (typeof params === "string") {
                params += '&key=' + this.key + '&sig=' + this.sig();
            }
            queryString = this.urlScheme + this.urlHost + path +
                '?' + params;
            doAjax = function (promise) {
                settings = {
                    type: settings.type || 'GET',
                    dataType: settings.dataType || 'json',
                    data: settings.data || undefined,
                    contentType: settings.data ?
                            settings.contentType ||
                                'application/json; charset=utf-8' :
                            undefined,
                    success: settings.success ||
                        function (data, textStatus, jqXHR) {
                            Em.run(promise, promise.resolve, data);
                        },
                    error: settings.error ||
                        function (jqXHR, textStatus, errorThrown) {
                            Em.run(promise, promise.reject, jqXHR);
                        }
                };
                $.ajax(queryString, settings);
            };

            return Em.Deferred.promise(doAjax);
        },
        /**
         * Generate error callback for rejected promises
         * @param {Object} jqXHR jqXHR object
         * @returns {Object} jqXHR object
         * Prints the toString representation of jqXHR to the console as well
         */
        errorCallback: function (jqXHR) {
            console.log(jqXHR);
            return jqXHR;
        },
        /**
         * Generic API response callback function
         * @param {Object} data API Response data
         * @returns {Array} The data array
         */
        apiCallback: function (data) {
            return data.data;
        },
        /**
         * Generic API single record response callback function
         * @param {Object} data API Response data
         * @returns {Object|Array|String} The record at data array index 0
         */
        apiRecordCallback: function (data) {
            return data.data[0];
        },
        /**
         * Generate generic model response callback function
         * @param {Object} that Model instance
         * @returns {Function} The callback function
         */
        modelCallback: function (that) {
            /**
             * Generic model response callback function
             * @param {Object} data API Response data
             * @returns {Object} A model object of the affected record
             */
            return function(data) {
                var ret;
                if ($.isArray(data.data)) {
                    // The data.data array should always have 1 element
                    if (data.data.length === 1) {
                        ret = that.create(data.data[0]);
                        // Otherwise we return an empty model object
                    } else {
                        ret = that.create();
                    }
                }
                return ret;
            };
        },
        /**
         * Generate generic "array of models" response callback function
         * @param {Object} that Model instance
         * @param {String} sort Optional key sort string
         * @returns {Function} The callback function
         */
        modelsCallback: function (that, sort) {
            /**
             * Generic "array of models" response callback function
             * @param {Object} data API Response data
             * @returns {Array} An array of model objects
             */
            return function(data) {
                var ret = [], i, k;
                if ($.isArray(data.data)) {
                    for (i = 0, k = data.data.length; i < k; i += 1) {
                        ret.pushObject(that.create(data.data[i]));
                    }
                }
                return sort ? ret.sortBy(sort) : ret;
            };
        },
        /**
         * Generic find callback function
         */
        findCallback: function (that) {
            return this.modelCallback(that);
        },
        /**
         * Generic "find all" callback function
         */
        findAllCallback: function (that) {
            return this.modelsCallback(that);
        },
        /**
         * Generate generic update callback function
         * @param {Object} that Model instance
         * @returns {Function} The generic API response callback function
         */
        updateCallback: function (that) {
            return this.modelCallback(that);
        },
        /**
         * Generate generic add callback function
         * @param {Object} that Model instance
         * @returns {Function} The generic API response callback function
         */
        addCallback: function (that) {
            return this.modelCallback(that);
        },
        /**
         * Generate generic remove callback function
         * @param {Object} that Model instance
         * @returns {Function} The generic API response callback function
         */
        removeCallback: function (that) {
            return this.modelCallback(that);
        },
        /**
         * Generic find
         * @param {string=} name Object name
         * @returns {Function}
         */
        find: function (name) {
            var path, that = this;
            path = name ? this.appPath + name : this.appPath;
            return this.ajax(path).then(
                name ? this.findCallback(that) : this.findAllCallback(that),
                this.errorCallback
            );
        },
        /**
         * Generic update
         * @param {string} name Record name to update
         * @param {Object} data Data object describing changes
         * @returns {Object} Record object with updates applied
         */
        update: function (name, data) {
            var path, params = {}, settings, that = this;
            path = this.appPath + name;
            settings = {
                type: 'POST',
                data: JSON.stringify(data)
            };
            return this.ajax(path, params, settings).then(
                this.updateCallback(that),
                this.errorCallback
            );
        },
        /**
         * Generic add
         * @param {Object} obj Object describing new record
         * @returns {Object} New record object
         */
        add: function (obj) {
            var path, params = {}, settings, that = this;
            path = this.appPath;
            settings = {
                type: 'POST',
                data: JSON.stringify(obj)
            };
            return this.ajax(path, params, settings).then(
                this.addCallback(that),
                this.errorCallback
            );
        },
        /**
         * Generic remove
         * @param {string} name Name of record to delete
         * @returns {Object} Deleted record object
         */
        remove: function (name) {
            var path, params = {}, settings, that = this;
            path = this.appPath + name;
            settings = {
                type: 'DELETE'
            };
            return this.ajax(path, params, settings).then(
                this.removeCallback(that),
                this.errorCallback
            );
        },
        /**
         * Generic jqXHR wrapper for retrieving the 'data' array from the API
         * @param {string} name Name of record to delete
         * @returns {Object} Deleted record object
         */
        apiData: function (verb, path, params, data) {
            var settings = {
                type: verb
            };
            if (data) {
                settings.data = JSON.stringify(data);
            }
            return this.ajax(path, params, settings).then(
                this.apiCallback,
                this.errorCallback
            );
        }
    }
);

/**
 * Initialize Quarry model classes
 */
Quarry.initModels = function () {
    /**
     * Quarry.Meta class
     * @class Quarry.Meta
     * @extends Quarry.Model
     * @classdesc Quarry Metadata API
     */
    this.Meta = Quarry.Model.extend().reopenClass(
        /** @lends Quarry.Meta.prototype */
        {
            appPath: '/meta/'
        }
    );
    /**
     * Quarry.Logging class
     * @class Quarry.Logging
     * @extends Quarry.Model
     * @classdesc Woodstove Logger API connector
     */
    this.Logging = Quarry.Model.extend().reopenClass(
        /** @lends Quarry.Logging.prototype */
        {
            /**
             * Find all log entries created by a job
             * @param {string} uuid Job UUID
             * @returns {Logs} a job's log entries
             */
            findJob: function (uuid) {
                var path, params, that = this;
                path = '/logging';
                params = {
                    where: JSON.stringify({
                        "context.job.uuid": uuid
                    })
                };
                return this.ajax(path, params).then(
                    function (data) {
                        var i, k, log = {
                            total: data.total,
                            entries: []
                        };
                        for (i = 0, k = data.data.length; i < k; i += 1) {
                            log.entries.pushObject(that.create(data.data[i]));
                        }
                        return log;
                    },
                    that.errorCallback
                );
            }
        }
    );
    /**
     * Quarry.Job class
     * @class Quarry.Job
     * @extends Quarry.Model
     * @classdesc Woodstove Jobs API connector
     */
    this.Job = Quarry.Model.extend().reopenClass(
        /** @lends Quarry.Job.prototype */
        {
            appPath: '/jobs/',
            /**
             * Generate custom callback function for Quarry.Job.find(uuid)
             * @param {Object} that Model instance
             * @returns {Function} The callback function
             */
            findCallback: function (that) {
                /**
                 * Job 'find' success (fulfilled Promise) callback function
                 * @param {Object} data API Response data
                 * @returns {Job} A Job object, including all existent child jobs
                 */
                return function (data) {
                    var job = that.create(data.data[0]);
                    if ($.inArray(
                        data.data[0].func,
                        ['bulk_run', 'sync_zones']
                    ) > -1) {
                        return that.children(job.get('uuid')).then(
                            function success(children) {
                                job.set('children', children);
                                return job;
                            },
                            function failure(jqXHR) {
                                return job;
                            }
                        );
                    }
                    return job;
                };
            },
            /**
             * Get all of the logged-in user's created jobs
             * @returns {Array.<Job>} Array of Job objects
             */
            mine: function () {
                var path, that = this;
                path = this.appPath + 'mine';

                return this.ajax(path).then(
                    function (data) {
                        var jobs = [], i, k;
                        for (i = 0, k = data.data.length; i < k; i += 1) {
                            jobs.pushObject(that.create(data.data[i]));
                        }
                        return jobs;
                    },
                    that.errorCallback
                );
            },
            /**
             * Get all child jobs associated with a parent job
             * @param {string} uuid Job UUID
             * @returns {Array.<Job>} Array of Job objects
             */
            children: function (uuid) {
                var path, that = this;
                path = this.appPath + uuid + '/children';
                return this.ajax(path).then(
                    function (data) {
                        var jobs = [], i, k;
                        for (i = 0, k = data.data.length; i < k; i += 1) {
                            jobs.pushObject(that.create(data.data[i]));
                        }
                        return jobs;
                    },
                    that.errorCallback
                );
            }
        }
    );
    /**
     * Quarry.Serp class
     * @class Quarry.Serp
     * @extends Quarry.Model
     * @classdesc An Asset Search API abstraction layer
     */
    this.Serp = Quarry.Model.extend().reopenClass(
        /** @lends Quarry.Serp.prototype */
        {
            /**
             * Perform an asset search
             * @param {SearchAsset} searchTerms A SearchAsset object
             * @returns {Serp} serp object
             * containing assets that match the search criteria
             */
            find: function (searchTerms) {
                var path, params = {}, that = this;
                path = '/quarry/assets/';
                // compose a URI query string object
                if (searchTerms) {
                    params = searchTerms.getProperties(
                        'sort', 'limit', 'offset'
                    );
                    params.where = searchTerms.get('asset');
                }
                return this.ajax(path, params).then(
                    function (data) {
                        var i, k, serp = {
                            total: data.total,
                            assets: []
                        };
                        for (i = 0, k = data.data.length; i < k; i += 1) {
                            serp.assets.pushObject(that.create(data.data[i]));
                        }
                        return serp;
                    },
                    that.errorCallback
                );
            }
        }
    );
    /**
     * Quarry.Asset class
     * @class Quarry.Asset
     * @extends Quarry.Model
     * @classdesc Quarry Asset API connector
     */
    this.Asset = Quarry.Model.extend().reopenClass(
        /** @lends Quarry.Asset.prototype */
        {
            appPath: '/quarry/assets/'
        }
    );
    /**
     * Quarry.Kickstart class
     * @class Quarry.Kickstart
     * @extends Quarry.Model
     * @classdesc Quarry Kickstart (ks) API connector
     */
    this.Kickstart = Quarry.Model.extend().reopenClass(
        /** @lends Quarry.Kickstart.prototype */
        {
            appPath: '/quarry/pxe/targets/'
        }
    );
    /**
     * Quarry.Network class
     * @class Quarry.Network
     * @extends Quarry.Model
     * @classdesc Quarry Network (ipdb) API connector
     */
    this.Network = Quarry.Model.extend().reopenClass(
        /** @lends Quarry.Network.prototype */
        {
            appPath: '/quarry/ipdb/networks/'
        }
    );
    /**
     * Quarry.Layout class
     * @class Quarry.Layout
     * @extends Quarry.Model
     * @classdesc Quarry Layout API connector
     */
    this.Layout = Quarry.Model.extend().reopenClass(
        /** @lends Quarry.Layout.prototype */
        {
            appPath: '/quarry/partition/layouts/',
            /**
             * Get a layout partition
             * @param {string} layout_id Layout id
             * @param {string} entry_id Entry id
             * @returns {LayoutEntry} layout partition entry
             * matching the search criteria
             */
            findEntry: function (layout_id, entry_id) {
                var path, that = this;
                path = '/layout/' + layout_id + '/partition/' + entry_id;
                return this.ajax(path).then(
                    function (obj) {
                        return obj.data[0];
                    },
                    that.errorCallback
                );
            },
            /**
             * Add a new entry to a layout
             * @param {string} layout_id Layout id
             * @param {LayoutEntry} entry Entry object
             * describing new layout entry
             * @returns {LayoutEntry} the new layout entry
             */
            addEntry: function (layout_id, entry) {
                var path, params = {}, settings, that = this;
                path = '/layout/' + layout_id + '/partition';
                settings = {
                    type: 'POST',
                    data: JSON.stringify(entry)
                };
                return this.ajax(path, params, settings).then(
                    function (obj) {
                        return obj.data[0];
                    },
                    that.errorCallback
                );
            },
            /**
             * Remove an entry from a layout
             * @param {string} layout_id Layout id
             * @param {string} entry_id Entry id
             * @returns {LayoutEntry} the deleted layout entry
             */
            delEntry: function (layout_id, entry_id) {
                var path, params = {}, settings, that = this;
                path = '/layout/' + layout_id + '/partition/' + entry_id;
                settings = {
                    type: 'DELETE'
                };
                return this.ajax(path, params, settings).then(
                    function (obj) {
                        return obj.data[0];
                    },
                    that.errorCallback
                );
            }
        }
    );
    /**
     * Quarry.Mortar class
     * @class Quarry.Mortar
     * @extends Quarry.Model
     * @classdesc Mortar API connector
     */
    this.Mortar = Quarry.Model.extend().reopenClass(
        /** @lends Quarry.Mortar.prototype */
        {
            /**
             * Commission a virtual host
             * @param {Asset} asset Asset object describing the target asset
             * @param {Kickstart} kickstart Kickstart object
             * describing the target OS
             * @param {Vm} vm Vm object describing the target virtual host
             * @param {Layout} layout Layout object
             * describing the OS storage specs
             * @returns {Job} Job object created by the commission execution
             */
            commission: function (asset, kickstart, vm, layout, role) {
                var path, params = {}, settings;
                path = '/mortar/commission/vm';
                settings = {
                    type: 'POST',
                    data: JSON.stringify({
                        'asset': asset,
                        'kstarget': kickstart,
                        'vm': vm,
                        'layout': layout,
                        'role': role
                    })
                };
                return this.ajax(path, params, settings).then(
                    this.apiRecordCallback,
                    this.errorCallback
                );
            },
            /**
             * Decommission an asset
             * @param {string} asset_id Asset id
             * @returns {Job} Job object created by the decommission execution
             */
            decommission: function (asset_id) {
                var path, params = {}, settings;
                path = '/mortar/decommission/' + asset_id;
                settings = {
                    type: 'POST'
                };
                return this.ajax(path, params, settings).then(
                    this.apiRecordCallback,
                    this.errorCallback
                );
            },
            /**
             * Cleanup asset records (assume not an actual virtual host)
             * @param {string} asset_id Asset id
             * @returns {Job} Job object created by the asset_cleanup execution
             */
            asset_cleanup: function (asset_id) {
                var path, params = {}, settings;
                path = '/mortar/asset/cleanup/' + asset_id;
                settings = {
                    type: 'POST'
                };
                return this.ajax(path, params, settings).then(
                    this.apiRecordCallback,
                    this.errorCallback
                );
            },
            /**
             * Rekick a virtual host
             * @param {string} asset_id Asset id
             * @param {Kickstart} kickstart Kickstart object
             * describing the new, target OS
             * @param {Layout} layout Layout object
             * describing the OS storage specs
             * @returns {Job} Job object created by the rekick execution
             */
            rekick: function (asset_id, kickstart, layout) {
                var path, params = {}, settings;
                path = '/mortar/rekick/' + asset_id;
                settings = {
                    type: 'POST',
                    data: JSON.stringify({
                        'kstarget': kickstart,
                        'layout': layout
                    })
                };
                return this.ajax(path, params, settings).then(
                    this.apiRecordCallback,
                    this.errorCallback
                );
            },
            /**
             * Rename a virtual host
             * @param {string} asset_id Asset id
             * @param {string} new_fqdn Rename to this FQDN
             * @param {boolean} reboot Reboot host after rename?
             * @returns {Job} Job object created by the rename execution
             */
            rename: function (asset_id, new_fqdn, reboot) {
                var path, params = {}, settings;
                path = '/mortar/rename/' + asset_id;
                settings = {
                    type: 'POST',
                    data: JSON.stringify({
                        'fqdn': new_fqdn,
                        'reboot': reboot
                    })
                };
                return this.ajax(path, params, settings).then(
                    this.apiRecordCallback,
                    this.errorCallback
                );
            }
        }
    );
    /**
     * Quarry.MortarBulk class
     * @class Quarry.MortarBulk
     * @extends Quarry.Model
     * @classdesc MortarBulk API connector
     */
    this.MortarBulk = Quarry.Model.extend().reopenClass(
        /** @lends Quarry.MortarBulk.prototype */
        {
            /**
             * Queues up a MortarBulk job for verification
             * @param {string} action Action name supported by MortarBulk
             * @param {string} routeVar Additional string to append to
             * API route (a 'type' of the passed-in action, for example)
             * @param {Object} data Data object that describes the context
             * of the MortarBulk request
             * @returns {Bulk} Bulk object
             */
            prepBulk: function (action, routeVar, data) {
                var path, params = {}, settings, that = this;
                path = '/mortar/bulk/' + action;
                if (routeVar) {
                    path += String('/' + routeVar);
                }
                settings = {
                    type: 'POST',
                    data: JSON.stringify(data)
                };
                return this.ajax(path, params, settings).then(
                    this.modelCallback(that),
                    this.errorCallback
                );
            },
            /**
             * Verifies a MortarBulk job, queuing it for operation
             * @param {string} bulk_id Bulk id
             * @returns {Job} Job object
             */
            verify: function (bulk_id) {
                var path, params = {}, settings;
                path = '/mortar/bulk/' + bulk_id + '/verify';
                settings = {
                    type: 'POST'
                };
                return this.ajax(path, params, settings).then(
                    this.apiRecordCallback,
                    this.errorCallback
                );
            },
            /**
             * Cancels a Mortar Bulk job, i.e., do not add it to the jobs queue
             * @param {string} bulk_id Bulk id
             * @returns {Bulk} Bulk object
             */
            cancel: function (bulk_id) {
                var path, params = {}, settings, that = this;
                path = '/mortar/bulk/' + bulk_id;
                settings = {
                    type: 'DELETE'
                };
                return this.ajax(path, params, settings).then(
                    this.modelCallback(that),
                    this.errorCallback
                );
            }
        }
    );
    /**
     * Quarry.Power class
     * @class Quarry.Power
     * @extends Quarry.Model
     * @classdesc Quarry Power API connector
     */
    this.Power = Quarry.Model.extend().reopenClass(
        /** @lends Quarry.Power.prototype */
        {
            /**
             * Executes a power action against an asset
             * @param {string} action Which power action to execute
             * @param {string} fqdn Target host FQDN
             * @returns {Job} Bulk object
             */
            push: function (action, fqdn) {
                var path, params = {}, settings;
                path = '/power/' + action;
                settings = {
                    type: 'POST',
                    data: JSON.stringify({
                        'fqdn': fqdn
                    })
                };
                return this.ajax(path, params, settings).then(
                    this.apiRecordCallback,
                    this.errorCallback
                );
            }
        }
    );
    /**
     * Quarry.Vm class
     * @class Quarry.Vm
     * @extends Quarry.Model
     * @classdesc Vm API connector
     */
    this.Vm = Quarry.Model.extend().reopenClass(
        /** @lends Quarry.Vm.prototype */
        {
            appPath: '/vm/guests/'
        }
    );
    /**
     * Quarry.Hypervisor class
     * @class Quarry.Hypervisor
     * @extends Quarry.Model
     * @classdesc Quarry Hypervisors (vm) API connector
     */
    this.Hypervisor = Quarry.Model.extend().reopenClass(
        /** @lends Quarry.Hypervisor.prototype */
        {
            appPath: '/vm/hypervisors/',
            /**
             * Generate custom callback func for Quarry.Hypervisor.find(name)
             * @param {Object} that Model instance
             * @returns {Function} The callback function
             */
            findCallback: function (that) {
                /**
                 * Hypervisor 'find' success (fulfilled Promise) callback func
                 * @param {Object} data API Response data
                 * @returns {Hypervisor} A Hypervisor object
                 */
                return function (data) {
                    var hypervisor = that.create(data.data[0]);
                    if (typeof hypervisor.get('name') === "string") {
                        return that.vms(hypervisor.get('name')).then(
                            function success(vms) {
                                hypervisor.set('vms', vms);
                                return hypervisor;
                            },
                            function failure(jqXHR) {
                                return hypervisor;
                            }
                        );
                    }
                    return hypervisor;
                };
            },
            /**
             * Get a hypervisor's managed virtual hosts
             * @param {string} name Hypervisor name
             * @returns {Array.<Vm>} Array of Vm objects
             */
            vms: function (name) {
                var path;
                path = this.appPath + name + '/vms';
                return this.apiData('GET', path);
            },
            /**
             * Get a list of hypervisor candidates
             * @param {Vm} vm Vm object
             * @param {string} pool Pool name
             * @param {string} cluster Cluster prefix (e.g., 'reply')
             * @param {boolean=} [reserve=true] Make a reservation
             * on the 'best' hypervisor candidate?
             * @returns {Array.<Hypervisor>} Array of Hypervisor objects
             */
            schedule: function (vm, pool, cluster, reserve) {
                var path, params = {}, settings, that = this;
                path = '/vm/scheduler';
                settings = {
                    type: 'POST',
                    data: JSON.stringify({
                        'vm': vm,
                        'pool': pool,
                        'cluster': cluster || null,
                        'reserve': reserve === undefined ? true : reserve
                    })
                };
                return this.ajax(path, params, settings).then(
                    this.modelsCallback(that),
                    this.errorCallback
                );
            }
        }
    );
    /**
     * Quarry.Pool class
     * @class Quarry.Pool
     * @extends Quarry.Model
     * @classdesc Quarry Pool (vm) API connector
     */
    this.Pool = Quarry.Model.extend().reopenClass(
        /** @lends Quarry.Pool.prototype */
        {
            appPath: '/vm/pools/',
            /**
             * Get hypervisors in a pool
             * @param {string} name Name of pool
             * @returns {Array.<Hypervisor>} Array of Hypervisor objects
             */
            get_hypervisors: function (name) {
                var path;
                path = '/vm/pools/' + name + '/hypervisors';
                return this.apiData('GET', path);
            }
        }
    );
    /**
     * Quarry.Dns class
     * @class Quarry.Dns
     * @extends Quarry.Model
     * @classdesc Quarry Dns API connector
     */
    this.Dns = Quarry.Model.extend().reopenClass(
        /** @lends Quarry.Dns.prototype */
        {
            /**
             * Sync Quarry records in DNS
             * @returns {Job} Job object
             */
            sync: function () {
                var path, params = {}, settings;
                path = '/quarry/dns/sync/sync/zone';
                settings = {
                    type: 'POST'
                };
                return this.ajax(path, params, settings).then(
                    this.apiRecordCallback,
                    this.errorCallback
                );
            }
        }
    );
    /**
     * Quarry.Cardstack class
     * @class Quarry.Cardstack
     * @extends Quarry.Model
     * @classdesc Cardstack (cardrunner) API connector
     */
    this.Cardstack = Quarry.Model.extend().reopenClass(
        /** @lends Quarry.Cardstack.prototype */
        {
            appPath: '/cardrunner/cardstacks/',
            /**
             * Add a card to a cardstack
             * @param {string} cardstack_id Cardstack id
             * @param {string} card_id Card id
             * @returns {Cardstack} Cardstack object with added card
             */
            add_card: function (cardstack_id, card_id) {
                var path, params = {}, settings, that = this;
                path = this.appPath + cardstack_id +
                    '/add_card/' + card_id;
                settings = {
                    type: 'POST'
                };
                return this.ajax(path, params, settings).then(
                    this.modelCallback(that),
                    this.errorCallback
                );
            },
            /**
             * Remove a card from a cardstack
             * @param {string} cardstack_id Cardstack id
             * @param {string} card_id Card id
             * @param {string} order Order value of card in cardstack
             * @returns {Cardstack} Modified cardstack object
             */
            remove_card: function (cardstack_id, card_id, order) {
                var path, params = {}, settings;
                path = this.appPath + cardstack_id +
                    '/remove_card/' + card_id + '/' + order;
                settings = {
                    type: 'DELETE'
                };
                return this.ajax(path, params, settings).then(
                    this.apiRecordCallback,
                    this.errorCallback
                );
            },
            /**
             * Promote a card's order one ordinal in a cardstack
             * (e.g., from position "2" to position "1")
             * @param {string} cardstack_id Cardstack id
             * @param {string} card_id Card id
             * @returns {Cardstack} Modified cardstack object
             */
            promote_card: function (cardstack_id, card_id) {
                var path, params = {}, settings, that = this;
                path = this.appPath + cardstack_id +
                    '/promote/' + card_id;
                settings = {
                    type: 'POST'
                };
                return this.ajax(path, params, settings).then(
                    this.modelCallback(that),
                    this.errorCallback
                );
            },
            /**
             * Demote a card's order one ordinal in a cardstack
             * (e.g., from position "2" to position "3")
             * @param {string} cardstack_id Cardstack id
             * @param {string} card_id Card id
             * @returns {Cardstack} Modified cardstack object
             */
            demote_card: function (cardstack_id, card_id) {
                var path, params = {}, settings, that = this;
                path = this.appPath + cardstack_id +
                    '/demote/' + card_id;
                settings = {
                    type: 'POST'
                };
                return this.ajax(path, params, settings).then(
                    this.modelCallback(that),
                    this.errorCallback
                );
            },
            /**
             * "Run" a cardstack, e.g. execute each card (script) in order
             * @param {string} cardstack_id Cardstack id
             * @param {Asset} query Asset object as a search query
             * @returns {Job} Job object
             */
            run: function (cardstack_id, query) {
                var path, params = {}, settings;
                path = this.appPath + cardstack_id + '/run';
                settings = {
                    type: 'POST',
                    data: JSON.stringify({
                        'query': query
                    })
                };
                return this.ajax(path, params, settings).then(
                    this.apiRecordCallback,
                    this.errorCallback
                );
            },
            /**
             * Get the execution output of a cardstack job
             * @param {string} oid Reference to docstore oid containing output
             * @returns {CardstackOutput} Cardstack output object
             */
            get_output: function (oid) {
                var path;
                path = this.appPath + 'output/' + oid;
                return this.ajax(path).then(
                    this.apiRecordCallback,
                    this.errorCallback
                );
            }
        }
    );
    /**
     * Quarry.Card class
     * @class Quarry.Card
     * @extends Quarry.Model
     * @classdesc Card (cardrunner) API connector
     */
    this.Card = Quarry.Model.extend().reopenClass(
        /** @lends Quarry.Card.prototype */
        {
            appPath: '/cardrunner/cards/'
        }
    );
    /**
     * Quarry.Command class
     * @class Quarry.Command
     * @extends Quarry.Model
     * @classdesc Quarry Command API connector
     */
    this.Command = Quarry.Model.extend().reopenClass(
        /** @lends Quarry.Command.prototype */
        {
            appPath: '/quarry/command/',
            /**
             * Execute a remote command
             * @param {string} command Command string
             * @param {Asset} query Asset object as a search query
             * @returns {Job} Job object
             */
            run: function (command, query) {
                var params = {}, settings;
                settings = {
                    type: 'POST',
                    data: JSON.stringify({
                        'script': command,
                        'query': query
                    })
                };
                return this.ajax(this.appPath, params, settings).then(
                    this.apiRecordCallback,
                    this.errorCallback
                );
            },
            /**
             * Get the execution output of a remote command job
             * @param {string} oid Reference to docstore oid containing output
             * @returns {CommandOutput} Command output object
             */
            get_output: function (oid) {
                var path;
                path = this.appPath + 'output/' + oid;
                return this.ajax(path).then(
                    this.apiRecordCallback,
                    this.errorCallback
                );
            }
        }
    );
    /**
     * Quarry.Blade class
     * @class Quarry.Blade
     * @extends Quarry.Model
     * @classdesc Quarry Chef API connector
     */
    this.Blade = Quarry.Model.extend().reopenClass(
        /** @lends Quarry.Blade.prototype */
        {
            appPath: '/blade/',
            /**
             * Get a list of role names
             * @returns {Array.<String>} array of role names
             */
            roles: function () {
                var path;
                path = this.appPath + 'roles';
                return this.ajax(path).then(
                    function (data) {
                        var i, k, roles = [];
                        for (i = 0, k = data.data.length; i < k; i += 1) {
                            roles.pushObject(data.data[i]);
                        }
                        return roles.sort();
                    },
                    this.errorCallback
                );
            }
        }
    );
};