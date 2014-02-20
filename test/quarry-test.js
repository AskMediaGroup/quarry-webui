/*globals document, console, Em, App, Quarry, Mantel, $ */
Quarry.TESTING = true;
/** QuarryTest namespace
 * @namespace {Ember.Namespace} QuarryTest
 * @instance
 */
var QuarryTest = Em.Namespace.create(
    /** @lends Quarry.prototype */
    {
        /**
         * Mock AJAX request
         */
        ajaxStub: function (path, type, data, jsonResponse) {
            return $.mockjax({
                url: Quarry.Model.urlScheme + Quarry.Model.urlHost + path,
                type: type,
                data: data,
                dataType: 'json',
                responseText: jsonResponse
            });
        }
    }
);
$.mockjaxSettings.logging = false;
$.mockjaxSettings.responseTime = 0;
Quarry.api = new Mantel.Connection(Quarry.WOODSTOVE_HOST, '80', 'user', '');
Quarry.api.setSecret('aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee');
Quarry.Model.reopenClass({
    sig: function () {
        return String(Quarry.api.getSignature());
    },
    key: Quarry.api.getUserid(),
    urlScheme: 'http://',
    urlHost: Quarry.api.getHost() + ':' + Quarry.api.getPort()
});
Quarry.initModels();
/**
 * Setup Meta API fixture data
 */
QuarryTest.metaApi = {
    /* HTTP request data */
    data: null,
    /* HTTP response */
    response: {
        "data": [
            {
                "type": "",
                "gen": 6,
                "value": {
                    "constants": [
                        { "APPLICATION_TYPES": ["Test App"] },
                        { "BUSINESS_UNITS": ["Test BU"] },
                        { "PRODUCTION_TYPES": ["Test"] },
                        { "DC_CODES": ["lax", "jfk", "sea"] },
                        { "IP_TYPES": {"1": "Host IP", "3": "Reserved IP", "2": "LOM IP", "5": "Alternate IP", "4": "Rogue IP!"} },
                        { "DOMAIN_SUFFIX": ".mydomain" },
                        { "DC_REGEX_MATCH": "^[A-Za-z]*\\d+([A-Za-z]{3})\\.mydomain" },
                        { "CLOUD_LOCALES": ["lax", "nyc"] },
                        { "DEFAULT_SERP_OFFSET": 0 },
                        { "DEFAULT_SERP_DESC": false },
                        { "DEFAULT_SERP_SORT": "FQDN" },
                        { "DEFAULT_SERP_PAGE": 20 },
                        { "BIG_SERP_PAGE": 50 },
                        { "HUGE_SERP_PAGE": 100 },
                        { "JOBS_REFRESH": 60000 },
                        { "CARDSTACKS_REFRESH": 60000 },
                        { "JOB_REFRESH": 10000 },
                        { "JOB_LOGS_REFRESH": 3000 },
                        { "DEFAULT_RAM_XEN": 4 },
                        { "DEFAULT_CPU_CORES_XEN": 1 },
                        { "DEFAULT_STORAGE_XEN": 40 }
                    ]
                },
                "name": "QUARRY_UI"
            }
        ],
        "offset": 0,
        "returned": 1,
        "status": "success",
        "total": 1
    }
};
/**
 * Invoke the Meta API fixture
 */
QuarryTest.ajaxStub('/meta/QUARRY_UI*', 'GET',
    QuarryTest.metaApi.data, QuarryTest.metaApi.response);