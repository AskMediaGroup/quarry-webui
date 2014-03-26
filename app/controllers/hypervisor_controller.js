/*global console, App, Quarry, Em, $ */
App.HypervisorController = Em.ObjectController.extend({
    content: {},

    percentFull: function () {
        if (App.isArray(this.get('vms'))) {
            return this.get('vms').length / App.VIRTUALIZATION_CONSOLIDATION_RATIO * 100;
        }
        return undefined;
    }.property('vms.@each'),

    availVms: function () {
        if (App.isArray(this.get('vms'))) {
            return App.VIRTUALIZATION_CONSOLIDATION_RATIO -
                this.get('vms').length;
        }
        return undefined;
    }.property('vms.@each'),

    vms_allocated_style: function () {
        return 'width: ' + this.get('percentFull') ?
            this.get('percentFull').toFixed() + '%' :
            '0%';
    }.property('percentFull'),

    vms_avail_style: function () {
        return 'width: ' + this.get('percentFull') ?
            (100 - +this.get('percentFull').toFixed()) + '%' :
            '0%';
    }.property('percentFull')
});