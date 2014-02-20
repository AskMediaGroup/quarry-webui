/*global Handlebars, Em, $ */
Em.Handlebars.registerBoundHelper('jobStatusBanner', function (job) {
    var banner;
    if (job) {
        switch (job.state) {
        case 0:
            banner = '<span class="badge">' + job.func + '</span>';
            break;
        case 1:
            banner = '<span class="badge badge-info">' + job.func + '</span>';
            break;
        case 5:
            banner = '<span class="badge badge-success">' + job.func + '</span>';
            break;
        case 10:
            banner = '<span class="badge badge-inverse">' + job.func + '</span>';
            break;
        case 15:
            banner = '<span class="badge badge-important">' + job.func + '</span>';
            break;
        default:
            banner = '<span class="badge">' + job.func + '</span>';
            break;
        }
        return new Handlebars.SafeString(banner);
    }
});