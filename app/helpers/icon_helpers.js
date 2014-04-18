/*global App, Em, Handlebars */
Em.Handlebars.registerBoundHelper('icon', function (name) {
    var icon, addStyles, insertIntoStack, icons;
    // This is to deal with passing in literal strings to the helper
    // e.g. {{icon name="power"}}
    // Passing a literal string results in an Object with the value
    // in the hash.name property hierarchy
    icon = name.hash.name || name;

    addStyles = function (str, classes) {
        var existing = str ? str.split('class="')[1].split('"')[0] : '';
        return '<i class="' + existing + ' ' + classes + '"></i>';
    };

    insertIntoStack = function (str, iconClass) {
        var existing = str ?
                str.split(/(<span\ class\=\"icon-stack\"\>[\w\W]*?<\/i\>)/) :
                '';
        if (existing) {
            return existing[1] + iconClass + existing[2];
        }
    };

    icons = Em.Object.create({
        /* Main app functionality icons */
        home: '<i class="icon-home"></i>',
        assetAction: '<i class="icon-cogs"></i>',
        power: '<i class="icon-bolt"></i>',
        commission: '<i class="icon-plus"></i>',
        utils: '<i class="icon-medkit"></i>',
        jobs: '<i class="icon-tasks"></i>',
        tools: '<i class="icon-wrench"></i>',
        network: '<i class="icon-sitemap"></i>',
        layouts: '<i class="icon-puzzle-piece"></i>',
        dnsSync: '<i class="icon-exchange"></i>',
        vm: '<i class="icon-cloud"></i>',
        physical: '<i class="icon-hdd"></i>',
        decommission: '<i class="icon-remove"></i>',
        cleanup: '<i class="icon-trash"></i>',
        rekick: '<i class="icon-repeat"></i>',
        rename: '<i class="icon-edit"></i>',
        csv: '<i class="icon-download"></i>',
        stop: '<i class="icon-off"></i>',
        start: '<i class="icon-play"></i>',
        power_cycle: '<i class="icon-refresh"></i>',
        reset: '<i class="icon-eject"></i>',
        shutdown: '<i class="icon-stop"></i>',
        restart: '<i class="icon-undo"></i>',
        cardrunner: '<i class="icon-terminal"></i>',
        cardstack: '<i class="icon-briefcase"></i>',
        card: '<i class="icon-terminal"></i>',
        metadata: '<i class="icon-inbox"></i>',
        pool: '<i class="icon-cloud"></i>',
        search: '<i class="icon-search"></i>',
        advSearch: '<i class="icon-eye-open"></i>',
        serp: '<i class="icon-list-ol"></i>',
        email: '<i class="icon-envelope"></i>',
        group: '<i class="icon-group"></i>',
        idTag: '<i class="icon-tag"></i>',
        bulk: '<i class="icon-truck"></i>',
        magic: '<i class="icon-magic"></i>',
        ramDetails: '<i class="icon-align-justify"></i>',
        bulkCancel: '<i class="icon-fire-extinguisher"></i>',
        /* General purpose */
        add: '<i class="icon-expand-alt"></i>',
        del: '<i class="icon-remove"></i>',
        delStack: '<span class="icon-stack">' +
            '<i class="icon-ban-circle icon-stack-base text-error"></i></span>',
        blackBackground: '<span class="icon-stack">' +
            '<i class="icon-sign-blank icon-stack-base"></i></span>',
        mutedBackground: '<span class="icon-stack">' +
            '<i class="icon-sign-blank icon-stack-base icon-muted"></i></span>',
        dangerBackground: '<span class="icon-stack">' +
            '<i class="icon-sign-blank icon-stack-base text-error"></i></span>',
        cloudStack: '<span class="icon-stack">' +
            '<i class="icon-cloud icon-stack-base"></i></span>',
        cloudStackMuted: '<span class="icon-stack">' +
            '<i class="icon-cloud icon-stack-base icon-muted"></i></span>',
        cloudStackDanger: '<span class="icon-stack">' +
            '<i class="icon-cloud icon-stack-base text-error"></i></span>',
        edit: '<i class="icon-edit"></i>',
        swapVertical: '<i class="icon-exchange icon-rotate-90"></i>',
        check: '<i class="icon-ok"></i>',
        navUp: '<i class="icon-caret-up"></i>',
        navDown: '<i class="icon-caret-down"></i>',
        reload: '<i class="icon-refresh"></i>',
        loading: '<i class="icon-refresh icon-spin"></i>',
        more: '<i class="icon-folder-open-alt"></i>',
        info: '<i class="icon-info-sign"></i>',
        codeSeparator: ' <i class="icon-code"></i> ',
        /* Button icons */
        cancel: '<i class="icon-ban-circle icon-large"></i>',
        warning: '<i class="icon-warning-sign"></i>',
        caution: '<i class="icon-exclamation"></i>',
        next: '<i class="icon-step-forward"></i>',
        back: '<i class="icon-step-backward"></i>',
        rightArrow: '<i class="icon-arrow-right"></i>',
        leftArrow: '<i class="icon-arrow-left"></i>',
        upArrow: '<i class="icon-arrow-up"></i>',
        downArrow: '<i class="icon-arrow-down"></i>'
    });


    icons.setProperties({
        /* The Navbar icons are a combination of large app icons + down arrow */
        navSearch: addStyles(icons.get('search'), 'icon-large') +
            icons.get('navDown'),
        navAssetActions: addStyles(icons.get('assetAction'), 'icon-large') +
            icons.get('navDown'),
        navPower: addStyles(icons.get('power'), 'icon-large') +
            icons.get('navDown'),
        navCommission: addStyles(icons.get('commission'), 'icon-large') +
            icons.get('navDown'),
        navUtils: addStyles(icons.get('utils'), 'icon-large') +
            icons.get('navDown'),
        navJobs: addStyles(icons.get('jobs'), 'icon-large') +
            icons.get('navDown'),
        navJobsFailed: addStyles(icons.get('jobs'), 'icon-large failed-jobs') +
            icons.get('navDown'),
        navTools: addStyles(icons.get('tools'), 'icon-large'),
        /* The page icons are muted */
        homePage: addStyles(icons.get('home'), 'muted'),
        jobsPage: addStyles(icons.get('jobs'), 'muted'),
        vmPage: addStyles(icons.get('vm'), 'muted'),
        physicalPage: addStyles(icons.get('physical'), 'muted'),
        advSearchPage: addStyles(icons.get('advSearch'), 'muted'),
        rekickPage: addStyles(icons.get('rekick'), 'muted'),
        renamePage: addStyles(icons.get('rename'), 'muted'),
        serpPage: addStyles(icons.get('serp'), 'muted'),
        cautionPage: addStyles(icons.get('caution'), 'text-error'),
        kickstartsPage: addStyles(icons.get('serp'), 'muted'),
        networksPage: addStyles(icons.get('network'), 'muted'),
        networkPage: addStyles(icons.get('network'), 'muted'),
        hypervisorsPage: addStyles(icons.get('physical'), 'muted'),
        layoutsPage: addStyles(icons.get('layouts'), 'muted'),
        cardstacksPage: addStyles(icons.get('cardstack'), 'muted'),
        metadataPage: addStyles(icons.get('metadata'), 'muted'),
        dnsSyncPage: addStyles(icons.get('dnsSync'), 'muted'),
        csvPage: addStyles(icons.get('csv'), 'muted'),
        bulkOkPage: addStyles(icons.get('check'), 'muted'),
        bulkCancelPage: addStyles(icons.get('bulkCancel'), 'muted'),
        /* Various serp icons */
        hasIps: addStyles(icons.get('network'), 'icon-large'),
        noIps: addStyles(icons.get('network'), 'icon-large muted'),
        hasRamDetails: addStyles(icons.get('ramDetails'), 'icon-large'),
        noRamDetails: addStyles(icons.get('ramDetails'), 'icon-large muted'),
        hasDiskInfo: addStyles(icons.get('physical'), 'icon-large'),
        noDiskInfo: addStyles(icons.get('physical'), 'icon-large muted'),
        hasOwner: addStyles(icons.get('email'), 'icon-large'),
        noOwner: addStyles(icons.get('email'), 'icon-large muted'),
        hasGroup: addStyles(icons.get('group'), 'icon-large'),
        noGroup: addStyles(icons.get('group'), 'icon-large muted'),
        serpTag: addStyles(icons.get('idTag'), 'icon-large'),
        /* Various delete icons */
        delNetwork: insertIntoStack(icons.get('delStack'),
            icons.get('network')),
        delMetadata: insertIntoStack(icons.get('delStack'),
            icons.get('metadata')),
        delLayout: insertIntoStack(icons.get('delStack'),
            icons.get('layouts')),
        delCardstack: insertIntoStack(icons.get('delStack'),
            icons.get('cardstack')),
        delCard: insertIntoStack(icons.get('delStack'),
            icons.get('card')),
        delPool: insertIntoStack(icons.get('delStack'),
            icons.get('pool')),
        arbitraryScript: insertIntoStack(icons.get('blackBackground'),
            '<i class="icon-terminal icon-light"></i>'),
        script: insertIntoStack(icons.get('cloudStack'),
            '<i class="icon-terminal icon-light"></i>'),
        pools: insertIntoStack(icons.get('cloudStack'),
            '<i class="icon-hdd icon-light"></i>'),
        cloudStorage: insertIntoStack(icons.get('cloudStack'),
            '<i class="icon-hdd icon-light"></i>'),
        cloudMemory: insertIntoStack(icons.get('cloudStack'),
            '<i class="icon-save icon-light"></i>'),
        cardsPage: insertIntoStack(icons.get('cloudStackMuted'),
            '<i class="icon-terminal"></i>'),
        poolsPage: insertIntoStack(icons.get('cloudStackMuted'),
            '<i class="icon-hdd"></i>'),
        arbitraryScriptsPage: insertIntoStack(icons.get('dangerBackground'),
            '<i class="icon-terminal icon-light"></i>')
    });

    return new Handlebars.SafeString(icons.get(icon) || '');
});
