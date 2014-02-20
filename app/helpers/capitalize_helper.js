/*global Handlebars, Em, $ */
Em.Handlebars.registerBoundHelper('capitalize', function (str) {
    return new Handlebars.SafeString(
        str.charAt(0).toUpperCase() + str.slice(1)
    );
});