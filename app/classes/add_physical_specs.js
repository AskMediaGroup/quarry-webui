/*global App, Em */
App.AddPhysicalSpecs = Em.Object.extend({
    assetTag: null,
    hostname: null,
    FQDN: function () {
        return this.get('hostname') + App.DOMAIN_SUFFIX;
    }.property('hostname'),
    prodType: null,
    ownerEmail: null,
    ownerGroup: null,
    application: null,
    businessUnit: null,
    mac: null,
    hostNetwork: null,
    lomNetwork: null,
    swRaid: null
});