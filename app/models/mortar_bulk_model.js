/*global App, Quarry, Em, DS, $ */
App.MortarBulk = Quarry.MortarBulk.extend({
    /** MortarBulk will return an 'assets' array with one index
        for each asset target in the bulk job */
    assets: [
        [
            /*FQDN string*/
            null,
            /*asset ID integer*/
            null
        ]
    ],
    bulk_id: null,
    func: null,
    func_name: null,
    job_uuid: null,
    query: App.SearchAsset.create(),
    args: {},
    kwargs: null,
    hasKwargs: function () {
        return this.get('kwargs') ? true : false;
    }.property('kwargs'),
    type: null,
    user_id: null,
    verified: null,
    verify_user_id: null,

    name: function () {
        var powerDesc = Em.Object.create({
            stop: 'power off',
            start: 'power on',
            power_cycle: 'power cycle',
            reset: 'reset',
            restart: 'restart',
            shutdown: 'shutdown'
        });
        switch (this.get('func_name')) {
        case 'decommission':
            return 'decommission';
        case 'asset_cleanup':
            return 'cleanup';
        case 'rekick':
            return 'rekick';
        case 'bulk_physical_create':
            return 'add asset records';
        case 'power':
            return powerDesc[this.get('kwargs.power_func')];
        default:
            return '';
        }
    }.property('func_name'),

    fqdnArr: function () {
        if (this.get('assets')) {
            var newArr = Em.A([]);
            this.get('assets').forEach(function (item, index, enumerable) {
                newArr.pushObject(Em.Object.create({
                    fqdn: item[0]
                }));
            });
            return newArr;
        } else {
            return undefined;
        }
    }.property('assets')
});