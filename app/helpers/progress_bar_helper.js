/*global Handlebars, Em, $ */
Em.Handlebars.registerBoundHelper('progressBar', function (percent) {
    // Returns a bootstrap progress bar
    var div = '<div class="bar" style="width: ' + percent + '%;"></div>';
    return new Handlebars.SafeString(div);
});