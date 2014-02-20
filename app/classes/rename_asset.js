/*global App, Em */
App.RenameAsset = Em.Object.extend({
    id: null,
    FQDN: null,
    reboot: null,
    newName: null,

    hostname: function () {
        return this.get('FQDN') ? this.get('FQDN').split(App.DOMAIN_SUFFIX)[0] : '';
    }.property('FQDN'),

    newFqdn: function () {
        return this.get('newName') + App.DOMAIN_SUFFIX;
    }.property('newName')
});