/*global Handlebars, Em, App, $ */
Em.Handlebars.registerBoundHelper('netType', function (type) {
    if (type) {
        var str = App.IP_TYPES[type];
        if (str) {
            return new Handlebars.SafeString(str);
        }
        return new Handlebars.SafeString('IP');
    }
    return new Handlebars.SafeString('IP');
});