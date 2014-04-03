/*global App, Em, Handlebars, $ */
Em.Handlebars.registerBoundHelper('hostIp', function (ipsArray) {
    // Returns the first ip address of type 1 that is found
    var i, k, hostIp;
    for (i = 0, k = ipsArray.length; i < k; i += 1) {
        if (ipsArray[i].type === 1) {
            hostIp = ipsArray[i].ip;
        }
    }
    if (hostIp) {
        return new Handlebars.SafeString(hostIp);
    }
    return new Handlebars.SafeString('');
});
