/*global console, Mantel, Em, $, document */
/*jslint browser: true*/
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
/**
 * Pool Member object
 * @typedef {Object} PoolMember
 * @property {String} address IP address of member
 * @property {String} name Member name
 * @property {boolean} available Member available?
 * @property {boolean} enabled Member enabled?
 * @property {number} port Member listening port
 * @property {VipPool=} pool - VIP Pool object
 */
/**
 * VIP Pool object
 * @typedef {Object} VipPool
 * @property {boolean} available Pool available?
 * @property {boolean} enabled Pool enabled?
 * @property {String} name Pool name
 * @property {Array.<PoolMember>} members Pool members array
 */
/**
 * VIP object
 * @typedef {Object} Vip
 * @property {string} address IP address of VIP
 * @property {string} name VIP name
 * @property {number} port VIP listening port
 * @property {VipPool=} pool - VIP Pool object
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
         * Ajax convenience that respects the Ember runloop
         * @returns {Object} Ember.Deferred.promise Ember promise object
         */
        ajax: function (path, params, settings) {
            params = params || {};
            settings = settings || {};
            var queryString, doAjax;
            params.key = this.key;
            params.sig = this.sig();
            queryString = this.urlScheme + this.urlHost + path +
                '?' + $.param(params);
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
        errorCallback: function (jqXHR) {
            console.log(jqXHR);
            return jqXHR;
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
            /**
             * Get metadata record
             * @param {string=} name Metadata record name
             * @returns {Meta|Array.<Meta>} Meta object
             * if name string was passed in, otherwise an array of Meta objects
             */
            find: function (name) {
                var path, that = this;
                path = name ? '/meta/' + name : '/meta/';
                return this.ajax(path).then(
                    function (obj) {
                        if (name) {
                            return that.create(obj.data[0]);
                        }
                        var metadata = [];
                        $.each(obj.data, function (i, metadatum) {
                            metadata.pushObject(that.create(metadatum));
                        });
                        return metadata;

                    },
                    that.errorCallback
                );
            },
            /**
             * Update metadata record
             * @param {string} name Metadata record name to update
             * @param {Object} data Data object describing changes
             * @returns {Meta} Meta object with updates applied
             */
            update: function (name, data) {
                var path, params = {}, settings, that = this;
                path = '/meta/' + name;
                settings = {
                    type: 'POST',
                    data: JSON.stringify(data)
                };
                return this.ajax(path, params, settings).then(
                    function (obj) {
                        return that.create(obj.data[0]);
                    },
                    that.errorCallback
                );
            },
            /**
             * Add a new metadata record
             * @param {Meta} meta Meta object describing new metadata record
             * @returns {Meta} New meta object
             */
            add: function (meta) {
                var path, params = {}, settings, that = this;
                path = '/meta/';
                settings = {
                    type: 'POST',
                    data: JSON.stringify(meta)
                };
                return this.ajax(path, params, settings).then(
                    function (obj) {
                        return that.create(obj.data[0]);
                    },
                    that.errorCallback
                );
            },
            /**
             * Remove metadata record
             * @param {string} name Name of metadata record to delete
             * @returns {Meta} Deleted meta object
             */
            remove: function (name) {
                var path, params = {}, settings, that = this;
                path = '/meta/' + name;
                settings = {
                    type: 'DELETE'
                };
                return this.ajax(path, params, settings).then(
                    function (obj) {
                        return that.create(obj.data[0]);
                    },
                    that.errorCallback
                );
            }
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
                    function (obj) {
                        var log, entries;
                        log = {
                            entries: Em.A(),
                            total: obj.total
                        };
                        entries = [];
                        $.each(obj.data, function (i, entry) {
                            entries.pushObject(that.create(entry));
                        });
                        log.entries = entries;
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
            /**
             * Get a job
             * @param {string} uuid Job UUID
             * @returns {Array.<Job>} Array of Job objects matching the
             * uuid criterion, including all existent child jobs
             */
            find: function (uuid) {
                var path, job, that = this;
                path = '/job/' + uuid;

                return this.ajax(path).then(
                    function (obj) {
                        job = that.create(obj.data[0]);
                        if ($.inArray(
                                obj.data[0].func,
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
                    },
                    that.errorCallback
                );
            },
            /**
             * Get all of the logged-in user's created jobs
             * @returns {Array.<Job>} Array of Job objects
             */
            mine: function () {
                var path, that = this;
                path = '/job/mine';

                return this.ajax(path).then(
                    function (obj) {
                        var jobs = [];
                        $.each(obj.data, function (i, job) {
                            jobs.pushObject(that.create(job));
                        });
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
                path = '/job/' + uuid + '/children';
                return this.ajax(path).then(
                    function (obj) {
                        var jobs = [];
                        $.each(obj.data, function (i, job) {
                            jobs.pushObject(that.create(job));
                        });
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
            search: function (searchTerms) {
                var path, params = {}, settings, that = this;
                path = '/asset/search';
                settings = {
                    type: 'POST',
                    data: JSON.stringify(
                        searchTerms.getProperties('asset', 'ips', 'limit',
                            'offset', 'sort', 'desc')
                    )
                };
                return this.ajax(path, params, settings).then(
                    function (obj) {
                        var serp;
                        serp = {
                            assets: Em.A(),
                            total: obj.total
                        };
                        $.each(obj.data, function (i, asset) {
                            serp.assets.pushObject(that.create(asset));
                        });
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
            /**
             * Get an asset
             * @param {string} asset_identifier Either an asset 'id' or 'FQDN'
             * @returns {Asset} the asset matching the id criterion
             */
            find: function (asset_identifier) {
                var path, that = this;
                path = '/asset/' + asset_identifier;
                return this.ajax(path).then(
                    function (obj) {
                        return that.create(obj.data[0]);
                    },
                    that.errorCallback
                );
            },
            /**
             * Update an asset
             * @param {Object} asset An Asset object
             * @returns {Asset} the updated asset
             */
            update: function (asset) {
                var path, params = {}, settings, that = this;
                path = '/asset/' + asset.id;
                settings = {
                    type: 'PUT',
                    data: JSON.stringify(asset)
                };
                return this.ajax(path, params, settings).then(
                    function (obj) {
                        return that.create(obj.data[0]);
                    },
                    that.errorCallback
                );
            }
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
            /**
             * Get all kickstarts
             * @returns {Array.<Kickstart>} Array of kickstart objects
             */
            // TODO: add support for retrieving a single kstarget record
            find: function () {
                var path, that = this;
                path = '/ks/target';
                return this.ajax(path).then(
                    function (obj) {
                        var kickstarts = [];
                        $.each(obj.data, function (i, kickstart) {
                            kickstarts.pushObject(that.create(kickstart));
                        });
                        return kickstarts;
                    },
                    that.errorCallback
                );
            }
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
            /**
             * Get networks
             * @param {string=} gateway Optional gateway string
             * (no gateway string implies wildcard search)
             * @returns {Network|Array.<Network>} Network object if gateway string
             * was passed in, otherwise an array of Network objects
             */
            find: function (gateway) {
                var path, that = this;
                path = gateway ? '/ipdb/network/' + gateway
                    : '/ipdb/network';
                return this.ajax(path).then(
                    function (obj) {
                        if (gateway) {
                            return that.create(obj.data[0]);
                        }
                        var networks = [];
                        $.each(obj.data, function (i, network) {
                            networks.pushObject(that.create(network));
                        });
                        return networks;
                    },
                    that.errorCallback
                );
            },
            /**
             * Update a network
             * @param {string} gateway Gateway string (network identifier)
             * @param {Network} network Network object with updated attributes
             * @returns {Network} the updated network
             */
            update: function (gateway, network) {
                var path, params = {}, settings, that = this;
                path = '/ipdb/network/' + gateway;
                settings = {
                    type: 'PUT',
                    data: JSON.stringify(network)
                };
                return this.ajax(path, params, settings).then(
                    function (obj) {
                        return that.create(obj.data[0]);
                    },
                    that.errorCallback
                );
            },
            /**
             * Add a new network
             * @param {Network} network Network object describing new network
             * @returns {Network} the new network
             */
            add: function (network) {
                var path, params = {}, settings, that = this;
                path = '/ipdb/network';
                settings = {
                    type: 'POST',
                    data: JSON.stringify(network)
                };
                return this.ajax(path, params, settings).then(
                    function (obj) {
                        return that.create(obj.data[0]);
                    },
                    that.errorCallback
                );
            },
            /**
             * Remove a network
             * @param {string} gateway Gateway string (network identifier)
             * @returns {Network} the deleted network
             */
            remove: function (gateway) {
                var path, params = {}, settings, that = this;
                path = '/ipdb/network/' + gateway;
                settings = {
                    type: 'DELETE'
                };
                return this.ajax(path, params, settings).then(
                    function (obj) {
                        return that.create(obj.data[0]);
                    },
                    that.errorCallback
                );
            }
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
            /**
             * Get layouts
             * @param {string=} id Optional layout id
             * (no layout id implies wildcard search)
             * @returns {Layout|Array.<Layouts>} Layout object if id string
             * was passed in, otherwise an array of Layout objects
             */
            find: function (id) {
                var path, params, that = this;
                path = id ? '/layout/' + id : '/layout';
                params = {
                    encoded: true
                };
                return this.ajax(path, params).then(
                    function (obj) {
                        if (obj.data.length > 1) {
                            var layouts = [];
                            $.each(obj.data, function (i, layout) {
                                layouts.pushObject(that.create(layout));
                            });
                            return layouts;
                        }
                        return that.create(obj.data[0]);
                    },
                    that.errorCallback
                );
            },
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
             * Update a layout
             * @param {string} layout_id Layout id
             * @param {Layout} layout Layout object with updated attributes
             * @returns {Layout} the updated layout
             */
            update: function (layout_id, layout) {
                var path, params = {}, settings, that = this;
                path = '/layout/' + layout_id;
                settings = {
                    type: 'PUT',
                    data: JSON.stringify(layout)
                };
                return this.ajax(path, params, settings).then(
                    function (obj) {
                        return that.create(obj.data[0]);
                    },
                    that.errorCallback
                );
            },
            /**
             * Add a new layout
             * @param {Layout} layout Layout object describing new layout
             * @returns {Layout} the new layout
             */
            add: function (layout) {
                var path, params = {}, settings, that = this;
                path = '/layout';
                settings = {
                    type: 'POST',
                    data: JSON.stringify(layout)
                };
                return this.ajax(path, params, settings).then(
                    function (obj) {
                        return that.create(obj.data[0]);
                    },
                    that.errorCallback
                );
            },
            /**
             * Remove a layout
             * @param {string} layout_id Layout id
             * @returns {Network} the deleted layout
             */
            remove: function (layout_id) {
                var path, params = {}, settings, that = this;
                path = '/layout/' + layout_id;
                settings = {
                    type: 'DELETE'
                };
                return this.ajax(path, params, settings).then(
                    function (obj) {
                        return that.create(obj.data[0]);
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
                var path, params = {}, settings, that = this;
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
                    function (obj) {
                        return obj.data[0];
                    },
                    that.errorCallback
                );
            },
            /**
             * Decommission an asset
             * @param {string} asset_id Asset id
             * @returns {Job} Job object created by the decommission execution
             */
            decommission: function (asset_id) {
                var path, params = {}, settings, that = this;
                path = '/mortar/decommission/' + asset_id;
                settings = {
                    type: 'POST'
                };
                return this.ajax(path, params, settings).then(
                    function (obj) {
                        return obj.data[0];
                    },
                    that.errorCallback
                );
            },
            /**
             * Cleanup asset records (assume not an actual virtual host)
             * @param {string} asset_id Asset id
             * @returns {Job} Job object created by the asset_cleanup execution
             */
            asset_cleanup: function (asset_id) {
                var path, params = {}, settings, that = this;
                path = '/mortar/asset/cleanup/' + asset_id;
                settings = {
                    type: 'POST'
                };
                return this.ajax(path, params, settings).then(
                    function (obj) {
                        return obj.data[0];
                    },
                    that.errorCallback
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
                var path, params = {}, settings, that = this;
                path = '/mortar/rekick/' + asset_id;
                settings = {
                    type: 'POST',
                    data: JSON.stringify({
                        'kstarget': kickstart,
                        'layout': layout
                    })
                };
                return this.ajax(path, params, settings).then(
                    function (obj) {
                        return obj.data[0];
                    },
                    that.errorCallback
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
                var path, params = {}, settings, that = this;
                path = '/mortar/rename/' + asset_id;
                settings = {
                    type: 'POST',
                    data: JSON.stringify({
                        'fqdn': new_fqdn,
                        'reboot': reboot
                    })
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
                    function (obj) {
                        return that.create(obj.data[0]);
                    },
                    that.errorCallback
                );
            },
            /**
             * Verifies a MortarBulk job, queuing it for operation
             * @param {string} bulk_id Bulk id
             * @returns {Job} Job object
             */
            verify: function (bulk_id) {
                var path, params = {}, settings, that = this;
                path = '/mortar/bulk/' + bulk_id + '/verify';
                settings = {
                    type: 'POST'
                };
                return this.ajax(path, params, settings).then(
                    function (obj) {
                        return obj.data[0];
                    },
                    that.errorCallback
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
                    function (obj) {
                        return that.create(obj.data[0]);
                    },
                    that.errorCallback
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
                var path, params = {}, settings, that = this;
                path = '/power/' + action;
                settings = {
                    type: 'POST',
                    data: JSON.stringify({
                        'fqdn': fqdn
                    })
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
     * Quarry.Vm class
     * @class Quarry.Vm
     * @extends Quarry.Model
     * @classdesc Vm API connector
     */
    this.Vm = Quarry.Model.extend().reopenClass(
        /** @lends Quarry.Vm.prototype */
        {
            /**
             * Get a vm object
             * @param {string} fqdn FQDN query to send to vm api
             * @returns {Vm} Vm object
             */
            find: function (fqdn) {
                var path, that = this;
                path = '/vm/guests/' + fqdn;
                return this.ajax(path).then(
                    function (data, textStatus, jqXHR) {
                        return that.create(data.data[0]);
                    },
                    that.errorCallback
                );
            }
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
            /**
             * Get hypervisor objects
             * @param {string=} fqdn FQDN query to send to vm api
             * @returns {Hypervisor|Array.<Hypervisor>} Hypervisor object
             * if fqdn string was passed in, otherwise an array of Hypervisors
             */
            find: function (fqdn) {
                var path, that = this;
                path = fqdn ? '/vm/hypervisors/' + fqdn : '/vm/hypervisors';
                return this.ajax(path).then(
                    function (obj) {
                        if (fqdn) {
                            return that.vms(obj.data[0].name).then(
                                function success(vms) {
                                    var ret = that.create(obj.data[0]);
                                    ret.set('vms', vms);
                                    return ret;
                                },
                                function failure(jqXHR) {
                                    return that.create(obj.data[0]);
                                }
                            );
                        }
                        var hypervisors = [];
                        $.each(obj.data, function (i, hypervisor) {
                            hypervisors.pushObject(that.create(hypervisor));
                        });
                        return hypervisors;
                    },
                    that.errorCallback
                );
            },
            /**
             * Get a hypervisor's managed virtual hosts
             * @param {string} fqdn Hypervisor FQDN
             * @returns {Array.<Vm>} Array of Vm objects
             */
            vms: function (fqdn) {
                var path, that = this;
                path = '/vm/hypervisors/' + fqdn + '/vms';
                return this.ajax(path).then(
                    function (obj) {
                        return obj.data;
                    },
                    that.errorCallback
                );
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
                    function (obj) {
                        var hypervisors = [];
                        $.each(obj.data, function (i, hypervisor) {
                            hypervisors.pushObject(that.create(hypervisor));
                        });
                        return hypervisors;
                    },
                    that.errorCallback
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
            /**
             * Get pools
             * @param {string=} name Pool name
             * @returns {Pool|Array.<Pool>} Pool object
             * if name string was passed in, otherwise an array of Pool objects
             */
            find: function (name) {
                var path, that = this;
                path = name ? '/vm/pools/' + name : '/vm/pools';
                return this.ajax(path).then(
                    function (obj) {
                        if (name) {
                            return that.create(obj.data[0]);
                        }
                        var pools = [];
                        $.each(obj.data, function (i, pool) {
                            pools.pushObject(that.create(pool));
                        });
                        return pools;
                    },
                    that.errorCallback
                );
            },
            /**
             * Update pool
             * @param {string} name Pool name to update
             * @param {Object} data Data object describing changes
             * @returns {Pool} Pool object with updates applied
             */
            update: function (name, data) {
                var path, params = {}, settings, that = this;
                path = '/vm/pools/' + name;
                settings = {
                    type: 'POST',
                    data: JSON.stringify(data)
                };
                return this.ajax(path, params, settings).then(
                    function (obj) {
                        return that.create(obj.data[0]);
                    },
                    that.errorCallback
                );
            },
            /**
             * Add a new pool
             * @param {Pool} pool Pool object describing new pool
             * @returns {Pool} New pool object
             */
            add: function (pool) {
                var path, params = {}, settings, that = this;
                path = '/vm/pools';
                settings = {
                    type: 'POST',
                    data: JSON.stringify(pool)
                };
                return this.ajax(path, params, settings).then(
                    function (obj) {
                        return that.create(obj.data[0]);
                    },
                    that.errorCallback
                );
            },
            /**
             * Remove pool
             * @param {string} name Name of pool to delete
             * @returns {Pool} Deleted pool object
             */
            remove: function (name) {
                var path, params = {}, settings, that = this;
                path = '/vm/pools/' + name;
                settings = {
                    type: 'DELETE'
                };
                return this.ajax(path, params, settings).then(
                    function (data, textStatus, jqXHR) {
                        return that.create(data.data[0]);
                    },
                    that.errorCallback
                );
            },
            /**
             * Get hypervisors in a pool
             * @param {string} name Name of pool
             * @returns {Array.<Hypervisor>} Array of Hypervisor objects
             */
            get_hypervisors: function (name) {
                var path;
                path = '/vm/pools/' + name + '/hypervisors';
                return this.ajax(path).then(
                    function success(data, textStatus, jqXHR) {
                        return data.data;
                    },
                    function failure(jqXHR) {
                        console.log(jqXHR);
                        return [];
                    }
                );
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
                var path, params = {}, settings, that = this;
                path = '/dns/sync/zone';
                settings = {
                    type: 'POST'
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
     * Quarry.Cardstack class
     * @class Quarry.Cardstack
     * @extends Quarry.Model
     * @classdesc Cardstack (cardrunner) API connector
     */
    this.Cardstack = Quarry.Model.extend().reopenClass(
        /** @lends Quarry.Cardstack.prototype */
        {
            /**
             * Get cardstacks
             * @param {string=} id Cardstack id
             * @returns {Cardstack|Array.<Cardstack>} Cardstack object if id
             * string was passed in, otherwise an array of Cardstack objects
             */
            find: function (id) {
                var path, that = this;
                path = id ? '/cardrunner/cardstacks/' + id :
                        '/cardrunner/cardstacks';

                return this.ajax(path).then(
                    function (obj) {
                        if (id) {
                            return that.create(obj.data[0]);
                        }
                        var cardstacks = [];
                        $.each(obj.data, function (i, cardstack) {
                            cardstacks.pushObject(that.create(cardstack));
                        });
                        return cardstacks;
                    },
                    that.errorCallback
                );
            },
            /**
             * Add a new cardstack
             * @param {Cardstack} cardstack Cardstack object
             * describing new cardstack
             * @returns {Cardstack} New cardstack object
             */
            add: function (cardstack) {
                var path, params = {}, settings, that = this;
                path = '/cardrunner/cardstacks';
                settings = {
                    type: 'POST',
                    data: JSON.stringify(cardstack)
                };
                return this.ajax(path, params, settings).then(
                    function (obj) {
                        return that.create(obj.data[0]);
                    },
                    that.errorCallback
                );
            },
            /**
             * Update cardstack
             * @param {string} id Cardstack id to update
             * @param {Object} data Data object describing changes
             * @returns {Cardstack} Cardstack object with updates applied
             */
            update: function (id, data) {
                var path, params = {}, settings, that = this;
                path = '/cardrunner/cardstacks/' + id;
                settings = {
                    type: 'POST',
                    data: JSON.stringify(data)
                };
                return this.ajax(path, params, settings).then(
                    function (obj) {
                        return that.create(obj.data[0]);
                    },
                    that.errorCallback
                );
            },
            /**
             * Add a card to a cardstack
             * @param {string} cardstack_id Cardstack id
             * @param {string} card_id Card id
             * @returns {Cardstack} Cardstack object with added card
             */
            add_card: function (cardstack_id, card_id) {
                var path, params = {}, settings, that = this;
                path = '/cardrunner/cardstacks/' + cardstack_id +
                    '/add_card/' + card_id;
                settings = {
                    type: 'POST'
                };
                return this.ajax(path, params, settings).then(
                    function (obj) {
                        return that.create(obj.data[0]);
                    },
                    that.errorCallback
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
                var path, params = {}, settings, that = this;
                path = '/cardrunner/cardstacks/' + cardstack_id +
                    '/remove_card/' + card_id + '/' + order;
                settings = {
                    type: 'DELETE'
                };
                return this.ajax(path, params, settings).then(
                    function (obj) {
                        return obj.data[0];
                    },
                    that.errorCallback
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
                path = '/cardrunner/cardstacks/' + cardstack_id +
                    '/promote/' + card_id;
                settings = {
                    type: 'POST'
                };
                return this.ajax(path, params, settings).then(
                    function (obj) {
                        return that.create(obj.data[0]);
                    },
                    that.errorCallback
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
                path = '/cardrunner/cardstacks/' + cardstack_id +
                    '/demote/' + card_id;
                settings = {
                    type: 'POST'
                };
                return this.ajax(path, params, settings).then(
                    function (obj) {
                        return that.create(obj.data[0]);
                    },
                    that.errorCallback
                );
            },
            /**
             * Remove a cardstack from the db
             * @param {string} id Cardstack id
             * @returns {Cardstack} Deleted cardstack object
             */
            remove: function (id) {
                var path, params = {}, settings, that = this;
                path = '/cardrunner/cardstacks/' + id;
                settings = {
                    type: 'DELETE'
                };
                return this.ajax(path, params, settings).then(
                    function (obj) {
                        return that.create(obj.data[0]);
                    },
                    that.errorCallback
                );
            },
            /**
             * "Run" a cardstack, e.g. execute each card (script) in order
             * @param {string} cardstack_id Cardstack id
             * @param {Asset} query Asset object as a search query
             * @returns {Job} Job object
             */
            run: function (cardstack_id, query) {
                var path, params = {}, settings, that = this;
                path = '/cardrunner/cardstacks/' + cardstack_id + '/run';
                settings = {
                    type: 'POST',
                    data: JSON.stringify({
                        'query': query
                    })
                };
                return this.ajax(path, params, settings).then(
                    function (obj) {
                        return obj.data[0];
                    },
                    that.errorCallback
                );
            },
            /**
             * Get the execution output of a cardstack job
             * @param {string} oid Reference to docstore oid containing output
             * @returns {CardstackOutput} Cardstack output object
             */
            get_output: function (oid) {
                var path, that = this;
                path = '/cardrunner/cardstacks/output/' + oid;
                return this.ajax(path).then(
                    function (obj) {
                        return obj.data[0];
                    },
                    that.errorCallback
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
            /**
             * Get cards
             * @param {string=} id Card id
             * @returns {Card|Array.<Card>} Card object if id string
             * was passed in, otherwise an array of Card objects
             */
            find: function (id) {
                var path, that = this;
                path = id ? '/cardrunner/cards/' + id : '/cardrunner/cards';
                return this.ajax(path).then(
                    function (obj) {
                        if (id) {
                            return that.create(obj.data[0]);
                        }
                        var cards = [];
                        $.each(obj.data, function (i, card) {
                            cards.pushObject(that.create(card));
                        });
                        return cards;
                    },
                    that.errorCallback
                );
            },
            /**
             * Add a new card
             * @param {Card} card Card object describing new card
             * @returns {Card} New card object
             */
            add: function (card) {
                var path, params = {}, settings, that = this;
                path = '/cardrunner/cards';
                settings = {
                    type: 'POST',
                    data: JSON.stringify(card)
                };
                return this.ajax(path, params, settings).then(
                    function (obj) {
                        return that.create(obj.data[0]);
                    },
                    that.errorCallback
                );
            },
            /**
             * Update card
             * @param {string} id Card id to update
             * @param {Object} data Data object describing changes
             * @returns {Card} Card object with updates applied
             */
            update: function (id, data) {
                var path, params = {}, settings, that = this;
                path = '/cardrunner/cards/' + id;
                settings = {
                    type: 'POST',
                    data: JSON.stringify(data)
                };
                return this.ajax(path, params, settings).then(
                    function (obj) {
                        return that.create(obj.data[0]);
                    },
                    that.errorCallback
                );
            },
            /**
             * Remove a card from the db
             * @param {string} id Card id
             * @returns {Card} Deleted card object
             */
            remove: function (id) {
                var path, params = {}, settings, that = this;
                path = '/cardrunner/cards/' + id;
                settings = {
                    type: 'DELETE'
                };
                return this.ajax(path, params, settings).then(
                    function (obj) {
                        return that.create(obj.data[0]);
                    },
                    that.errorCallback
                );
            }
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
            /**
             * Execute a remote command
             * @param {string} command Command string
             * @param {Asset} query Asset object as a search query
             * @returns {Job} Job object
             */
            run: function (command, query) {
                var path, params = {}, settings, that = this;
                path = '/command/script';
                settings = {
                    type: 'POST',
                    data: JSON.stringify({
                        'script': command,
                        'query': query
                    })
                };
                return this.ajax(path, params, settings).then(
                    function (obj) {
                        return obj.data[0];
                    },
                    that.errorCallback
                );
            },
            /**
             * Get the execution output of a remote command job
             * @param {string} oid Reference to docstore oid containing output
             * @returns {CommandOutput} Command output object
             */
            get_output: function (oid) {
                var path, that = this;
                path = '/command/output/' + oid;
                return this.ajax(path).then(
                    function (obj) {
                        return obj.data[0];
                    },
                    that.errorCallback
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
            /**
             * Get a list of role names
             * @returns {Array.<String>} array of role names
             */
            roles: function () {
                var path, that = this;
                path = '/blade/roles';
                return this.ajax(path).then(
                    function (obj) {
                        if (obj.data.length > 1) {
                            var roles = [];
                            $.each(obj.data, function (i, role) {
                                roles.pushObject(role);
                            });
                            return Em.A(roles).sortBy(name);
                        }
                        return Em.Object.create(obj.data[0]);
                    },
                    that.errorCallback
                );
            }
        }
    );
    /**
     * Quarry.BigIp class
     * @class Quarry.BigIp
     * @extends Quarry.Model
     * @classdesc Quarry BigIP API connector
     */
    this.BigIp = Quarry.Model.extend().reopenClass(
        /** @lends Quarry.BigIp.prototype */
        {
            /**
             * Get an array of DCs that have at least one LTM
             * @returns {Array.<String>} array of DC strings
             */
            dcs: function () {
                var path, that = this;
                path = '/bigip/ltm';
                return this.ajax(path).then(
                    function (data) {
                        var i, k, dcs = [];
                        for (i = 0, k = data.data.length; i < k; i += 1) {
                            dcs.pushObject(data.data[i]);
                        }
                        return Em.A(dcs);
                    },
                    that.errorCallback
                );
            },
            /**
             * Get an array of VIP names in a DC
             * @param {string} dc DC string
             * @returns {Array.<Vip>} array of VIP objects
             */
            vips: function (dc) {
                var path, that = this;
                path = '/bigip/ltm/vips/' + dc + '/';
                return this.ajax(path).then(
                    function (data) {
                        var i, k, vips = [];
                        for (i = 0, k = data.data.length; i < k; i += 1) {
                            vips.pushObject(data.data[i]);
                        }
                        return Em.A(vips);
                    },
                    that.errorCallback
                );
            },
            /**
             * Get a VIP by name reference
             * @param {string} dc DC string
             * @param {string} name VIP name string
             * @returns {Vip} VIP object
             */
            findByName: function (dc, name) {
                var path, that = this;
                path = '/bigip/ltm/vips/' + dc + '/name/' + name;
                return this.ajax(path).then(
                    function (data) {
                        return Em.Object.create(data.data[0]);
                    },
                    that.errorCallback
                );
            },
            /**
             * Get a VIP by IP reference
             * @param {string} dc DC string
             * @param {string} ip IP address string
             * @returns {Vip} VIP object
             */
            findByIp: function (dc, ip) {
                var path, that = this;
                path = '/bigip/ltm/vips/' + dc + '/ip/' + ip;
                return this.ajax(path).then(
                    function (data) {
                        return Em.Object.create(data.data[0]);
                    },
                    that.errorCallback
                );
            }
        }
    );
};