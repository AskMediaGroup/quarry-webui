/*globals module, test, asyncTest, start, equal, deepEqual, expect, ok, visit,
          find, console, Em, App, Quarry, QuarryTest, $ */
module('Network API', {
    setup: function () {
        this.networkProperties = ['network_id', 'lom_network_id', 'name',
            'gateway', 'netmask', 'datacenter', 'description', 'dns1', 'dns2'
            ];
        this.network = App.Network.create({
            network_id: 1,
            lom_network_id: 2,
            name: 'Test Network',
            gateway: '10.0.0.1',
            netmask: '255.255.255.0',
            dns1: '10.10.10.10',
            dns2: '10.10.10.11',
            description: 'Test Network',
            datacenter: 'LAX'
        });
        this.updatedNetwork = App.Network.create({
            network_id: 1,
            lom_network_id: 2,
            name: 'Test Network',
            gateway: '10.0.0.1',
            netmask: '255.255.255.0',
            dns1: '10.10.10.10',
            dns2: '10.10.10.11',
            description: 'Test Network updated',
            datacenter: 'LAX'
        });
        this.lomNetwork = App.Network.create({
            network_id: 2,
            lom_network_id: null,
            name: 'Test LOM Network',
            gateway: '10.0.1.1',
            netmask: '255.255.255.0',
            dns1: '10.10.10.10',
            dns2: '10.10.10.11',
            description: 'Test LOM Network',
            datacenter: 'LAX'
        });
        this.newNetwork = App.Network.create({
            network_id: 3,
            lom_network_id: null,
            name: 'New Network',
            gateway: '10.0.2.1',
            netmask: '255.255.255.0',
            dns1: '10.10.10.10',
            dns2: '10.10.10.11',
            description: 'New Network',
            datacenter: 'LAX'
        });
        this.fixtures = QuarryTest.networkApi(this.network, this.updatedNetwork,
            this.lomNetwork, this.newNetwork);
    },
    teardown: function () {
        $.mockjaxClear();
    }
});

asyncTest('App.Network.find()', function () {
    expect(2);
    var that = this;
    QuarryTest.ajaxStub('/ipdb/network*', 'GET',
        this.fixtures.findAll.data, this.fixtures.findAll.response);
    App.Network.find().then(
        function success(obj) {
            equal(obj.length, that.fixtures.findAll.response.data.length,
                'App.Network.find() returned an unexpected data array!');
            deepEqual(
                obj,
                [App.Network.create(that.network), App.Network.create(that.lomNetwork)],
                'App.Network.find() returned an unexpected response!'
            );
            start();
        }
    );
});

asyncTest('App.Network.find(gateway)', function () {
    expect(1);
    var that = this;
    QuarryTest.ajaxStub('/ipdb/network/' + this.network.get('gateway') + '*', 'GET',
        this.fixtures.find.data, this.fixtures.find.response);
    App.Network.find(this.network.get('gateway')).then(
        function success(obj) {
            deepEqual(obj.getProperties(that.networkProperties),
                that.network.getProperties(that.networkProperties),
                'App.Network.find(' + that.network.get('gateway') +
                    ') returned an unexpected property value!');
            start();
        }
    );
});

asyncTest('App.Network.update(gateway)', function () {
    expect(1);
    var that = this;
    QuarryTest.ajaxStub('/ipdb/network/' + this.updatedNetwork.get('gateway') +
        '*', 'PUT', this.fixtures.update.data, this.fixtures.update.response);
    App.Network.update(
        this.updatedNetwork.get('gateway'),
        this.updatedNetwork
    ).then(
        function success(obj) {
            deepEqual(obj.getProperties(that.networkProperties),
                that.updatedNetwork.getProperties(that.networkProperties),
                'App.Network.update(gateway) returned an unexpected ' +
                    'property value!');
            start();
        }
    );
});

asyncTest('App.Network.add(network)', function () {
    expect(1);
    var that = this;
    QuarryTest.ajaxStub('/ipdb/network*', 'POST',
        this.fixtures.add.data, this.fixtures.add.response);
    App.Network.add(this.newNetwork).then(
        function success(obj) {
            deepEqual(obj.getProperties(that.networkProperties),
                that.newNetwork.getProperties(that.networkProperties),
                'App.Network.add(network) returned an unexpected ' +
                    'property value!');
            start();
        }
    );
});

asyncTest('App.Network.remove(network)', function () {
    expect(1);
    var that = this;
    QuarryTest.ajaxStub('/ipdb/network/' + this.network.get('gateway') + '*',
        'DELETE', this.fixtures.remove.data, this.fixtures.remove.response);
    App.Network.remove(this.network.get('gateway')).then(
        function success(obj) {
            deepEqual(obj.getProperties(that.networkProperties),
                that.network.getProperties(that.networkProperties),
                'App.Network.remove(gateway) returned an unexpected ' +
                    'property value!');
            start();
        }
    );
});