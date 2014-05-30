/*global App, Em, $ */
App.AssetController = Em.ObjectController.extend({
    content: {},
    needs: ['application', 'serp'],
    currentPathBinding: 'controllers.application.currentPath',

    // values for select elements
    applicationTypeOptions: function () {
        return App.APPLICATION_TYPES;
    }.property('App.APPLICATION_TYPES.@each'),

    productionTypeOptions: function () {
        return App.PRODUCTION_TYPES;
    }.property('App.PRODUCTION_TYPES.@each'),

    businessUnitOptions: function () {
        return App.BUSINESS_UNITS;
    }.property('App.BUSINESS_UNITS.@each'),

    actions: {
        refresh: function () {
            var queryObj, that = this;
            queryObj = {
                where: {
                    id: this.get('id')
                }
            };
            App.Assets.find(queryObj).then(
                function (data) {
                    var asset = data.data[0];
                    // While we're storing available application types in memory
                    // as constant arrays we need to account for the fact that the db
                    // may have values that aren't in our arrays
                    if ($.inArray(asset.Application, App.APPLICATION_TYPES) === -1) {
                        App.APPLICATION_TYPES.pushObject(asset.Application);
                    }
                    if ($.inArray(asset.ProdType, App.PRODUCTION_TYPES) === -1) {
                        App.PRODUCTION_TYPES.pushObject(asset.ProdType);
                    }
                    if ($.inArray(asset.Business_Unit, App.BUSINESS_UNITS) === -1) {
                        App.BUSINESS_UNITS.pushObject(asset.Business_Unit);
                    }
                    that.setProperties({
                        content: App.Assets.create(asset),
                        status: undefined
                    });
                    that.set('formUpdated', false);
                }
            );
        },
        getAsset: function (fqdn) {
            var queryObj, that = this;
            this.set('isLoading', true);
            if (fqdn) {
                queryObj = {
                    where: {
                        FQDN: fqdn
                    }
                };
                App.Assets.find(queryObj).then(
                    function success(data) {
                        that.set('formUpdated', false);
                        that.transitionToRoute(
                            'asset',
                            App.Assets.create(data.data[0])
                        );
                    },
                    function failure(jqXHR, textStatus, errorThrown) {
                        console.log(jqXHR);
                    }
                );
            }
        },
        submit: function () {
            var model, asset, that = this;
            model = this.get('content');
            asset = Em.Object.create({
                id: model.id,
                Application: model.Application,
                Bits: parseInt(model.Bits, 10) || null,
                Chassis_Model: model.Chassis_Model,
                Business_Unit: model.Business_Unit,
                CPU: model.CPU,
                CPU_Cores: model.CPU_Cores,
                CPU_Sockets: model.CPU_Sockets,
                DC: model.DC,
                Disk0: model.Disk0,
                Disk1: model.Disk1,
                Disk2: model.Disk2,
                Disk3: model.Disk3,
                Disk4: model.Disk4,
                Disk5: model.Disk5,
                Filesystem0: model.Filesystem0,
                Filesystem1: model.Filesystem1,
                Filesystem2: model.Filesystem2,
                Filesystem3: model.Filesystem3,
                Filesystem4: model.Filesystem4,
                FQDN: model.FQDN,
                MAC: model.MAC,
                Manufacturer: model.Manufacturer,
                Notes: model.Notes,
                OS: model.OS,
                OS_Version: model.OS_Version,
                Owner_Email: model.Owner_Email,
                Owning_Group: model.Owning_Group,
                RAID_Controller: model.RAID_Controller,
                RAID_level: model.RAID_level,
                RAM_Total: model.RAM_Total,
                RAM: model.RAM,
                ProdType: model.ProdType,
                Service_Tag: model.Service_Tag,
                Switch: model.Switch,
                SW_RAID: this.get('isSwRaid') ? 1 : 0
            });
            App.Assets.update(asset.id, App.getNotNullAttrs(asset)).then(
                function success(response) {
                    that.set('status', { updated: true });
                },
                function failure(response) {
                    that.set('status', { updated: false });
                }
            );
        }
    },

    formObserver: function () {
        this.set('formUpdated', true);
    }.observes('Application', 'Bits', 'Chassis_Model', 'Business_Unit',
        'CPU', 'CPU_Cores', 'CPU_Sockets', 'DC', 'Disk0', 'Disk1', 'Disk2',
        'Disk3', 'Disk4', 'Disk5', 'Filesystem0', 'Filesystem1',
        'Filesystem2', 'Filesystem3', 'Filesystem4', 'FQDN', 'MAC',
        'Manufacturer', 'Notes', 'OS', 'OS_Version', 'Owner_Email',
        'Owning_Group', 'RAID_Controller', 'RAID_level', 'RAM_Total', 'RAM',
        'ProdType', 'Service_Tag', 'Switch', 'SW_RAID'),

    existingSerp: function () {
        return this.get('controllers.serp').get('content').length ?
                this.get('controllers.serp').get('content').length > 0 : false;
    }.property('controllers.serp.content'),

    serpContent: function () {
        return this.get('controllers.serp').get('content');
    }.property('controllers.serp.content'),

    assetIndex: function () {
        if (this.get('currentPath')) {
            return this.get('currentPath') === 'asset.index' ? true : false;
        }
        // This is weird, but refresh() confuses the router: 'currentPath'
        // returns 'undefined' (WTF?)  In such situations we assume we're
        // in the 'asset.index' route state
        return true;
    }.property('currentPath'),

    hasVnc: function () {
        return this.get('vm.vnc') ? true : false;
    }.property('vm.vnc'),

    goLastSearch: function () {
        this.transitionToRoute('serp');
    },

    getVmData: function () {
        var that = this;
        if (this.get('FQDN')) {
            App.Vm.find(this.get('FQDN')).then(
                function success(vm, textStatus, jqXHR) {
                    that.set('vm', vm);
                }
            );
        }
    },

    getHypervisorData: function () {
        var that = this;
        if (this.get('FQDN')) {
            App.Hypervisor.find(this.get('FQDN')).then(
                function success(hypervisor, textStatus, jqXHR) {
                    that.set('hypervisor', hypervisor);
                }
            );
        }
    }
});
