/*global App, Quarry, Em, DS, $ */
App.Serp = Quarry.Serp.extend({
    FQDN_MAX_LENGTH: 24,
    CHASSIS_MAX_LENGTH: 9,
    RAM_MAX_LENGTH: 6,
    OS_MAX_LENGTH: 18,
    ASSET_TAG_MAX_LENGTH: 8,

    hostname: function () {
        return this.get('FQDN') ? this.get('FQDN').split(App.DOMAIN_SUFFIX)[0] : '';
    }.property('FQDN'),

    domain: function () {
        // This should eventually be a Handlebars Helper, but couldn't find
        // a way to bind the return value from a helper to a view element,
        // which we need for a bootstrap popover
        if (this.get('FQDN')) {
            var fqdnArray = this.get('FQDN').split('.');
            // .shift() removes the first element from the array (i.e., FQDN)
            fqdnArray.shift();
            // we return a new string that represents the "domain"
            return '.' + fqdnArray.join('.');
        }
    }.property('FQDN'),

    isVm: function () {
        return this.get('VM') === 1;
    }.property('VM'),

    isLinux: function () {
        return this.get('Linux') === 1;
    }.property('Linux'),

    isWindows: function () {
        return this.get('Windows') === 1;
    }.property('Windows'),

    isSwRaid: function () {
        return this.get('SW_RAID') === 1;
    }.property('SW_RAID'),

    serpFqdn: function () {
        if (this.get('FQDN')) {
            return this.get('FQDN').slice(0, this.get('FQDN_MAX_LENGTH'));
        } else {
            return this.get('FQDN');
        }
    }.property('FQDN'),

    hasLongFqdnString: function () {
        return this.get('FQDN') ?
                this.get('FQDN').length > this.get('FQDN_MAX_LENGTH') : false;
    }.property('FQDN'),

    hasIpAddress: function () {
        return this.get('ips') ?
                this.get('ips').length > 0 : false;
    }.property('ips'),

    hasMultipleIps: function () {
        return this.get('ips') ?
                this.get('ips').length > 1 : false;
    }.property('ips'),

    allIps: function () {
        // TODO migrate to Handlebars Helper
        var ips, ipsString, that;
        ips = this.get('ips');
        ipsString = '';
        that = this;
        $.each(ips, function (i, ipData) {
            var type = App.IP_TYPES[ipData.type];
            ipsString = ipsString + '<strong>' + type + '</strong>: ' +
                ipData.ip + '<br>';
        });
        if (ipsString === '') {
            ipsString = 'This asset has no associated IP address.';
        }
        return ipsString;
    }.property('ips'),

    serpChassis: function () {
        return this.get('Chassis_Model') ?
                App.truncateStringAtWord(this.get('Chassis_Model'),
                    this.get('CHASSIS_MAX_LENGTH')) : '';
    }.property('Chassis_Model'),

    hasLongChassisString: function () {
        return this.get('Chassis_Model') ? this.get('Chassis_Model').length >
            this.get('CHASSIS_MAX_LENGTH') : false;
    }.property('Chassis_Model'),

    serpRamTotal: function () {
        return this.get('RAM_Total') ?
                App.truncateStringAtWord(this.get('RAM_Total'),
                    this.get('RAM_MAX_LENGTH')) : '';
    }.property('RAM_Total'),

    serpRam: function () {
        return this.get('RAM') ?
            this.get('RAM').replace(/\+/g, ' ') : 'RAM details not available.';
    }.property('RAM'),

    hasLongRamString: function () {
        return this.get('RAM_Total') ? this.get('RAM_Total').length >
            this.get('RAM_MAX_LENGTH') : false;
    }.property('RAM_Total'),

    hasRamDetails: function () {
        return this.get('RAM') ? true : false;
    }.property('RAM'),

    serpDiskInfo: function () {
        // TODO migrate to Handlebars Helper
        var diskString, diskObject, disk;
        diskString = '';
        diskObject = {
            'Disk 0': this.get('Disk0'),
            'Disk 1': this.get('Disk1'),
            'Disk 2': this.get('Disk2'),
            'Disk 3': this.get('Disk3'),
            'Disk 4': this.get('Disk4'),
            'Disk 5': this.get('Disk5')
        };
        for (disk in diskObject) {
            if (diskObject[disk] !== 'None' &&
                    diskObject[disk] !== null &&
                    diskObject[disk] !== '') {
                diskString = diskString + '<strong>' + disk + '</strong>: ' +
                    diskObject[disk] + '<br>';
            }
        }
        if (diskString === '') {
            diskString =
                'Disk information not available,<br> or no local disks.';
        }
        return diskString;
    }.property('Disk0', 'Disk1', 'Disk2', 'Disk3', 'Disk4', 'Disk5'),

    hasDiskInfo: function () {
        var noDiskInfoPattern = new RegExp('not available');
        return noDiskInfoPattern.exec(this.get('serpDiskInfo')) ? false : true;
    }.property('serpDiskInfo'),

    serpOs: function () {
        return this.get('OS') ? App.truncateStringAtWord(this.get('OS'),
            this.get('OS_MAX_LENGTH')) : '';
    }.property('OS'),

    hasLongOsString: function () {
        return this.get('OS') ? this.get('OS').length >
            this.get('OS_MAX_LENGTH') : false;
    }.property('OS'),

    hasOwnerEmail: function () {
        return this.get('Owner_Email');
    }.property('Owner_Email'),

    hasOwningGroup: function () {
        return this.get('Owning_Group');
    }.property('Owning_Group'),

    hasLongAssetTagString: function () {
        return this.get('Service_Tag') ? this.get('Service_Tag').length >
            this.get('ASSET_TAG_MAX_LENGTH') : false;
    }.property('Service_Tag')
});