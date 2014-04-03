/*global App, Em, Handlebars, $ */
Em.Handlebars.registerBoundHelper('cidr', function (netmask) {
    if (netmask) {
        var cidr, netmaskArray, i, k;
        cidr = 0;
        netmaskArray = netmask.split('.');
        for (i = 0, k = netmaskArray.length; i < k; i += 1) {
            cidr += Number(netmaskArray[i]).toString(2).split('1').length - 1;
        }
        return new Handlebars.SafeString(cidr);
    }
    return new Handlebars.SafeString('');
});
