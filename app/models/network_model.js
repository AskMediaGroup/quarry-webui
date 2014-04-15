/*global App, Em */
App.Network = Quarry.Network.extend({
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
    }.property('ips_percent_free')
});
