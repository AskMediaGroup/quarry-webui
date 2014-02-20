/*global Handlebars, Em, $ */
Em.Handlebars.registerBoundHelper('serpCountStats', function (searchTerms, options) {
    if (searchTerms) {
        var offset = searchTerms.get('offset'),
            limit = searchTerms.get('limit'),
            total = options.hash.total,
            range;
        range = total < limit ?
                (offset + 1) + ' - ' + total + ' of ' + total :
                total < limit + offset ?
                        (offset + 1) + ' - ' + total + ' of ' + total :
                        (offset + 1) + ' - ' + (limit + offset) + ' of ' + total;
        return new Handlebars.SafeString(range);
    }
    return new Handlebars.SafeString('');
});