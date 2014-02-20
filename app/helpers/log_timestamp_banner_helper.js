/*global Handlebars, Em, $ */
Em.Handlebars.registerBoundHelper('logTimestampBanner', function (logEntry) {
    var banner;
    switch (logEntry.level) {
    case 'DEBUG':
        banner = '<span class="label label-inverse">' + logEntry.get('timestamp') + '</span>';
        break;
    case 'ERROR':
        banner = '<span class="label label-important">' + logEntry.get('timestamp') + '</span>';
        break;
    default:
        banner = '<span class="label label-inverse">' + logEntry.get('timestamp') + '</span>';
        break;
    }
    return new Handlebars.SafeString(banner);
});