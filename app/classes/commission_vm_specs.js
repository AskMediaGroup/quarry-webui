/*global App, Em */
App.CommissionVmHostSpecs = Em.Object.extend({
    index: null,
    hostname: null,
    FQDN: function () {
        return this.get('hostname') + App.DOMAIN_SUFFIX;
    }.property('hostname'),
    clusterPrefix: function () {
        return this.get('hostname') ? '^' + this.get('hostname').split(/\d/)[0] :
                undefined;
    }.property('hostname'),
    prodType: null,
    ownerEmail: null,
    ownerGroup: null,
    chefRole: null,
    application: null,
    businessUnit: null,
    memory: null,
    capacity: null,
    cpus: null,
    kickstart: null,
    layout: null,
    hypervisor: null,
    hypervisorObserver: function () {
        var that = this;
        if (this.get('hypervisor')) {
            App.Hypervisor.find(this.get('hypervisor')).then(
                function (hypervisor) {
                    if (App.isArray(hypervisor.vms)) {
                        hypervisor.set(
                            'availVms',
                            App.VIRTUALIZATION_CONSOLIDATION_RATIO -
                                hypervisor.vms.length
                        );
                    }
                    that.set('hypervisorDetails', hypervisor);
                }
            );
        }
    }.observes('hypervisor')
});