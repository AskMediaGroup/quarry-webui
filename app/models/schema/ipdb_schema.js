/*global App*/
/**
 This object describes the static properties of a Network model

 @type {Object}
 **/
App.networkSchema = {
    network_id: null,
    lom_network_id: null,
    name: null,
    gateway: null,
    netmask: null,
    dns1: null,
    dns2: null,
    description: null,
    datacenter: null
};
/**
 This object describes the static properties of an Ip model

 @type {Object}
 **/
App.ipSchema = {
    ip_id: null,
    network_id: null,
    asset_id: null,
    ip: null,
    description: null,
    type: null,
    network: App.networkSchema,
    asset: App.assetSchema
};