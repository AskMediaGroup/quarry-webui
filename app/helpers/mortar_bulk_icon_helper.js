/*global App, Em, Handlebars */
Em.Handlebars.registerBoundHelper('mortarBulkIcon', function (func) {
    var iconString;
    switch (func) {
    case 'decommission':
        iconString = '<i class="icon-remove muted"></i>';
        break;
    case 'cleanup':
        iconString = '<i class="icon-remove muted"></i>';
        break;
    default:
        iconString = '';
        break;
    }
    return new Handlebars.SafeString(iconString);
});
