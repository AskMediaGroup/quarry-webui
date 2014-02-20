/*global Handlebars, Em, $ */
Em.Handlebars.registerBoundHelper('powerIcon', function (action) {
    // This type checking is to deal with passing in literal strings
    // to the helper, e.g. {{powerIcon action="icon-off"}}
    if (typeof action === 'object') {
        action = action.hash.action;
    }

    // Our <i> tag "hash table"
    var icons = Em.Object.create({
        stop: '<i class="icon-off"></i>',
        start: '<i class="icon-play"></i>',
        power_cycle: '<i class="icon-refresh"></i>',
        reset: '<i class="icon-eject"></i>',
        shutdown: '<i class="icon-stop"></i>',
        restart: '<i class="icon-undo"></i>'
    });

    return new Handlebars.SafeString(icons.get(action));
});