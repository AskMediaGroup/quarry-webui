/*global App, Em, Handlebars, $ */
Em.Handlebars.registerBoundHelper('cidr', function (netmask) {
    if (netmask) {
        var cidr, netmaskArray;
        cidr = 0;
        netmaskArray = netmask.split('.');
        $.each(netmaskArray, function (i, octet) {
            cidr = cidr + Number(octet).toString(2).split('1').length - 1;
        });
        return new Handlebars.SafeString(cidr);
    }
    return new Handlebars.SafeString('');
});
