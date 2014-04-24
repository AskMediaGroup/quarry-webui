/*global App, Em */
App.Networks = Quarry.Networks.extend({
    ips_percent_free: function () {
        if (typeof this.get('availIps') === 'number'
            && typeof this.get('totalIps') === 'number') {
            return (this.get('availIps') / this.get('totalIps')
                * 100).toFixed(2);
        } else {
            return undefined;
        }
    }.property('availIps', 'totalIps'),
    ips_free_style: function () {
        return 'width: ' + Number(this.get('ips_percent_free')).toFixed() + '%';
    }.property('ips_percent_free'),
    ips_used_style: function () {
        return 'width: ' +
            (100 - Number(this.get('ips_percent_free')).toFixed()) + '%';
    }.property('ips_percent_free'),
    hasStats: function () {
        return typeof this.get('availIps') === 'number'
            && typeof this.get('type1Ips') === 'number'
            && typeof this.get('type2Ips') === 'number'
            && typeof this.get('type3Ips') === 'number'
            && typeof this.get('type4Ips') === 'number'
            && typeof this.get('type5Ips') === 'number'
    }.property('availIps', 'type1Ips', 'type2Ips', 'type3Ips', 'type4Ips',
        'type5Ips')
});
