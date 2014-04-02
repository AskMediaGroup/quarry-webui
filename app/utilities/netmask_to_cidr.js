/*global App, Em, $ */
// Takes a subnet mask and converts to CIDR
// Assumes a valid subnet mask: 4 integers between 0-255 delimited by '.'
App.netmaskToCidr = function (netmask) {
    if (netmask) {
        var cidr, netmaskArray;
        cidr = 0;
        netmaskArray = netmask.split('.');
        $.each(netmaskArray, function (i, octet) {
            cidr = cidr + Number(octet).toString(2).split('1').length - 1;
        });
        return cidr;
    }
    return '';
};
