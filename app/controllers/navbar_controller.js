/*global App, Em */
App.NavbarController = Em.ObjectController.extend({
    content: {},
    needs: ['application', 'serp', 'asset', 'mortarBulk', 'commissionVm',
        'commissionVmSpecs', 'jobs', 'cardstacks'],
    serpBinding: 'controllers.serp.content',
    searchTermsBinding: 'controllers.serp.searchTerms',
    assetBinding: 'controllers.asset.content',
    numHostsBinding: 'controllers.commissionVm.numHosts',

    toolsLink: function () {
        return App.TOOLS_RELATIVE_PATH;
    }.property('App.TOOLS_RELATIVE_PATH'),

    actions: {
        commissionVm: function () {
            var modelArr = [], i = 0;
            switch (this.get('controllers.application').get('currentPath')) {
            case 'serp.index':
                if (this.get('serp').length) {
                    this.get('serp').forEach(
                        function (item, index, enumerable) {
                            i += 1;
                            modelArr.pushObject(App.CommissionVmHostSpecs.create({
                                index: i,
                                hostname: item.get('hostname'),
                                prodType: item.ProdType,
                                ownerEmail: item.Owner_Email,
                                ownerGroup: item.Owning_Group,
                                application: item.Application,
                                businessUnit: item.Business_Unit,
                                ram: Math.ceil(item.RAM_Total / 1073.741824),
                                storage:
                                    (item.Disk0 ? +item.Disk0.split('G')[0] : 0) +
                                        (item.Disk1 ? +item.Disk1.split('G')[0] : 0) +
                                        (item.Disk2 ? +item.Disk2.split('G')[0] : 0) +
                                        (item.Disk3 ? +item.Disk3.split('G')[0] : 0) +
                                        (item.Disk4 ? +item.Disk4.split('G')[0] : 0),
                                cores: item.CPU_Cores
                            }));
                        }
                    );
                    this.transitionToRoute('commissionSerp', modelArr);
                    break;
                }
                this.get('controllers.commissionVm').freshen();
                this.transitionToRoute('commissionVm.index');
                break;
            case 'asset.index':
                modelArr.pushObject(App.CommissionVmHostSpecs.create({
                    index: 1,
                    hostname: this.get('asset.hostname'),
                    prodType: this.get('asset.ProdType'),
                    ownerEmail: this.get('asset.Owner_Email'),
                    ownerGroup: this.get('asset.Owning_Group'),
                    application: this.get('asset.Application'),
                    businessUnit: this.get('asset.Business_Unit'),
                    ram: Math.ceil(this.get('asset.RAM_Total') / 1073.741824),
                    storage:
                        (this.get('asset.Disk0') ? +this.get('asset.Disk0').split('G')[0] : 0) +
                            (this.get('asset.Disk1') ? +this.get('asset.Disk1').split('G')[0] : 0) +
                            (this.get('asset.Disk2') ? +this.get('asset.Disk2').split('G')[0] : 0) +
                            (this.get('asset.Disk3') ? +this.get('asset.Disk3').split('G')[0] : 0) +
                            (this.get('asset.Disk4') ? +this.get('asset.Disk4').split('G')[0] : 0),
                    cores: this.get('asset.CPU_Cores')
                }));
                this.transitionToRoute('commissionVm.specs', modelArr);
                break;
            default:
                this.get('controllers.commissionVm').freshen();
                this.transitionToRoute('commissionVm.index');
                break;
            }
        },
        assetAction: function (action, type) {
            var modelArr = [], routeVar, that = this;
            switch (this.get('controllers.application').get('currentPath')) {
            case 'serp.index':
                switch (action) {
                case 'rekick':
                    this.get('serp').forEach(
                        function (item, index, enumerable) {
                            modelArr.pushObject(App.RekickAsset.create({
                                id: item.id,
                                FQDN: item.FQDN
                            }));
                        }
                    );
                    this.transitionToRoute('rekick', modelArr);
                    break;
                case 'rename':
                    this.get('serp').forEach(
                        function (item, index, enumerable) {
                            modelArr.pushObject(App.RenameAsset.create({
                                id: item.id,
                                FQDN: item.FQDN
                            }));
                        }
                    );
                    this.transitionToRoute('rename', modelArr);
                    break;
                case 'power':
                    routeVar = type;
                    this.get(
                        'controllers.mortarBulk'
                    ).prepBulk(action, routeVar, Em.Object.create({
                        query: this.get('searchTerms.asset')
                    })).then(
                        function (response) {
                            that.transitionToRoute('mortarBulk', response);
                        }
                    );
                    break;
                case 'export':
                    this.transitionToRoute(action, this.get('serp'));
                    break;
                case 'cardstack':
                    this.transitionToRoute('cardstack.run', type);
                    break;
                case 'command':
                    this.transitionToRoute('command');
                    break;
                default:
                    this.get(
                        'controllers.mortarBulk'
                    ).prepBulk(action, routeVar, Em.Object.create({
                        query: this.get('searchTerms.asset')
                    })).then(
                        function (response) {
                            that.transitionToRoute('mortarBulk', response);
                        }
                    );
                    break;
                }
                break;
            case 'asset.index':
                switch (action) {
                case 'decommission':
                    this.transitionToRoute('asset.decommission');
                    break;
                case 'asset/cleanup':
                    this.transitionToRoute('asset.cleanup');
                    break;
                case 'rekick':
                    this.transitionToRoute('asset.rekick');
                    break;
                case 'rename':
                    this.transitionToRoute('asset.rename');
                    break;
                case 'export':
                    modelArr.pushObject(this.get('asset'));
                    this.transitionToRoute(action, modelArr);
                    break;
                case 'power':
                    this.transitionToRoute('assetPower', App.Power.create({
                        id: this.get('asset.id'),
                        action: type,
                        description: this.get('powerDesc')[type]
                    }));
                    break;
                case 'cardstack':
                    this.transitionToRoute(
                        'assetCardstack',
                        App.Cardstack.create(type)
                    );
                    break;
                case 'command':
                    this.transitionToRoute('asset.run');
                    break;
                default:
                    break;
                }
                break;
            default:
                console.log('error! ' +
                    this.get('controllers.application').get('currentPath'));
                break;
            }
        },
        fqdnSearch: function () {
            var that = this;
            this.set('controllers.serp.searchTerms', App.SearchAsset.create({
                asset: {
                    FQDN: this.get('searchFieldVal')
                }
            }));
            this.transitionToRoute('serp.index', []);
            this.get(
                'controllers.serp'
            ).fqdnSearch(this.get('searchFieldVal')).then(
                function (response) {
                    that.transitionToRoute('serp.index', response);
                }
            );
        }
    },

    powerDesc: Em.Object.create({
        stop: 'power off',
        start: 'power on',
        power_cycle: 'power cycle',
        reset: 'reset',
        restart: 'restart',
        shutdown: 'shutdown'
    }),

    generalCardstacks: function () {
        var cardstacks = [];
        this.get('controllers.cardstacks').get('sorted').forEach(
            function (item, index, enumerable) {
                if (!item.get('query')) {
                    cardstacks.pushObject(item);
                }
            }
        );
        return cardstacks;
    }.property('controllers.cardstacks.sorted'),

    lastTenJobs: function () {
        return this.get('controllers.jobs').get('sorted').slice(0, 10);
    }.property('controllers.jobs.sorted'),

    hasFailedJobs: function () {
        if (this.get('controllers.jobs.sorted').filterBy('state', 15).length > 0) {
            return true;
        }
        return false;
    }.property('controllers.jobs.sorted')
});
