/*global App, Em */
App.CsvOptions = Em.Object.extend({
    defaultValue: true,
    init: function () {
        /*jslint nomen: true*/
        this.setProperties({
            id: this.get('defaultValue'),
            FQDN: this.get('defaultValue'),
            DC: this.get('defaultValue'),
            OS: this.get('defaultValue'),
            RAM: this.get('defaultValue'),
            RAM_Total: this.get('defaultValue'),
            Chassis_Model: this.get('defaultValue'),
            Service_Tag: this.get('defaultValue'),
            MAC: this.get('defaultValue'),
            Application: this.get('defaultValue'),
            Disk0: this.get('defaultValue'),
            Disk1: this.get('defaultValue'),
            Disk2: this.get('defaultValue'),
            Disk3: this.get('defaultValue'),
            Disk4: this.get('defaultValue'),
            Disk5: this.get('defaultValue'),
            Filesystem0: this.get('defaultValue'),
            Filesystem1: this.get('defaultValue'),
            Filesystem2: this.get('defaultValue'),
            Filesystem3: this.get('defaultValue'),
            Filesystem4: this.get('defaultValue'),
            ProdType: this.get('defaultValue'),
            Bits: this.get('defaultValue'),
            Windows: this.get('defaultValue'),
            Linux: this.get('defaultValue'),
            VM: this.get('defaultValue'),
            RAID_level: this.get('defaultValue'),
            BIOS_Ver: this.get('defaultValue'),
            Owner_Email: this.get('defaultValue'),
            Model: this.get('defaultValue'),
            Manufacturer: this.get('defaultValue'),
            RAID_Controller: this.get('defaultValue'),
            CPU_Cores: this.get('defaultValue'),
            CPU_Sockets: this.get('defaultValue'),
            CPU: this.get('defaultValue'),
            OS_Version: this.get('defaultValue'),
            SW_RAID: this.get('defaultValue'),
            Notes: this.get('defaultValue'),
            Owning_Group: this.get('defaultValue'),
            Business_Unit: this.get('defaultValue'),
            Switch_Port: this.get('defaultValue'),
            Switch: this.get('defaultValue'),
            Time_Modified: this.get('defaultValue'),
            ips: this.get('defaultValue')
        });
        return this._super();
    }
});
/*jslint nomen: false*/