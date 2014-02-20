/*global Handlebars, Em, $ */
Em.Handlebars.registerBoundHelper('hostIp', function (ipsArray) {
    // Returns the first ip address of type 1 that is found
    var hostIp;
    $.each(ipsArray, function (i, ipData) {
        if (ipData.type === 1) {
            hostIp = ipData.ip;
            return;
        }
    });
    if (hostIp) {
        return new Handlebars.SafeString(hostIp);
    }
    return new Handlebars.SafeString('');
});