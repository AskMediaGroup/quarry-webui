/*global App, Em, $ */
// Takes a subnet mask and converts to CIDR
// Assumes a valid subnet mask: 4 integers between 0-255 delimited by '.'
App.netmaskToCidr = function (netmask) {
    if (netmask) {
        var cidr, netmaskArray, i, k;
        cidr = 0;
        netmaskArray = netmask.split('.');
        for (i = 0, k = netmaskArray.length; i < k; i += 1) {
            cidr += Number(netmaskArray[i]).toString(2).split('1').length - 1;
        }
        return cidr;
    }
    return '';
};
