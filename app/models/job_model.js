/*global App, Em */
App.Jobs = Quarry.Jobs.extend({
    JOB_CODES: {
        0: "Created",
        1: "Queued",
        5: "Running",
        10: "Success",
        15: "Failed"
    },

    jobRefreshId: null,

    children: [],

    hasOutputJson: function () {
        if (this.get('output')) {
            return true;
        } else {
            return false;
        }
    }.property('output'),

    hasOutputDocstore: function () {
        if (this.get('output_docstore')) {
            return true;
        } else {
            return false;
        }
    }.property('output_docstore'),

    hasCardstackOutput: function () {
        if (this.get('output_docstore')) {
            return this.get('output_docstore.cardstack') ? true : false;
        } else {
            return false;
        }
    }.property('output_docstore'),

    hasRemoteCommandOutput: function () {
        if (this.get('func') === 'run_script') {
            if (this.get('output_docstore')) {
                return true;
            }
        } else {
            return false;
        }
    }.property('func', 'output_docstore'),

    hasCustomJsonOutput: function () {
        return this.get('hasRemoteCommandOutput') ||
            this.get('hasCardstackOutput');
    }.property('output'),

    remoteCommandString: function () {
        if (this.get('hasRemoteCommandOutput')) {
            return JSON.parse(this.get('args'))[0].script;
        } else {
            return undefined;
        }
    }.property('hasRemoteCommandOutput'),

    cardstackOutput: function () {
        if (this.get('hasCardstackOutput')) {
            var i, k, rawOutput = this.get('output_docstore'),
                output = {
                    cardstack: rawOutput.cardstack,
                    cards: []
                };
            for (i = 0, k = rawOutput.cards.length; i < k; i += 1) {
                var key;
                output.cards.pushObject({
                    card_id: rawOutput.cards[i].card_id,
                    command: rawOutput.cards[i].card_command,
                    name: rawOutput.cards[i].card_name
                });
                output.cards[i].hosts = [];
                for (key in rawOutput.cards[i].hosts) {
                    if (rawOutput.cards[i].hosts.hasOwnProperty(key)) {
                        if (typeof (rawOutput.cards[i].hosts[key]) === 'object') {
                            output.cards[i].hosts.pushObject({
                                fqdn: key,
                                code: rawOutput.cards[i].hosts[key].code,
                                stdout: rawOutput.cards[i].hosts[key].stdout,
                                stderr: rawOutput.cards[i].hosts[key].stderr
                            });
                        } else if (typeof (rawOutput.cards[i].hosts[key]) === 'string') {
                            output.cards[i].hosts.pushObject({
                                fqdn: key,
                                api_response: rawOutput.cards[i].hosts[key]
                            });
                        }
                    }
                }
            }
            return output;
        } else {
            return undefined;
        }
    }.property('hasCardstackOutput', 'output_docstore'),

    remoteCommandOutput: function () {
        if (this.get('hasRemoteCommandOutput')) {
            var rawOutput = this.get('output_docstore'), key,
                output = { hosts: [] };
            for (key in rawOutput) {
                if (rawOutput.hasOwnProperty(key)) {
                    if (typeof (rawOutput[key]) === 'object') {
                        output.hosts.pushObject({
                            fqdn: key,
                            code: rawOutput[key].code,
                            stdout: rawOutput[key].stdout,
                            stderr: rawOutput[key].stderr
                        });
                    } else if (typeof (rawOutput[key]) === 'string') {
                        output.hosts.pushObject({
                            fqdn: key,
                            api_response: rawOutput[key]
                        });
                    }
                }
            }
            return output;
        } else {
            return undefined;
        }
    }.property('hasRemoteCommandOutput'),

    logOutputArr: function () {
        return this.get('log') ?
                String(this.get('log')).match(/[^\n]+(?:\n|$)/g)
                : [];
    }.property('log'),

    output_stringified: function () {
        return JSON.stringify(this.get('output'), null, '\t');
    }.property('output'),

    args_stringified: function () {
        return JSON.stringify(this.get('args'), null, '\t');
    }.property('args'),

    kwargs_stringified: function () {
        return JSON.stringify(this.get('kwargs'), null, '\t');
    }.property('kwargs'),

    duration: function () {
        return this.get('end_time') && this.get('start_time')
            ? this.get('end_time') - this.get('start_time')
            : 'Unknown';
    }.property('end_time', 'start_time'),

    start_date: function () {
        return this.get('start_time')
            ? App.jobDateToString(this.get('start_time'))
            : 'Unknown';
    }.property('start_time'),

    end_date: function () {
        return this.get('end_time') ? App.jobDateToString(this.get('end_time'))
            : 'Unknown';
    }.property('end_time'),

    queue_date: function () {
        return this.get('queue_time')
            ? App.jobDateToString(this.get('queue_time'))
            : 'Unknown';
    }.property('queue_time'),

    status: function () {
        return this.get('state') >= 0 ?
                this.get('JOB_CODES')[this.get('state')] :
                'Unknown';
    }.property('state'),

    done: function () {
        return this.get('state') >= 10;
    }.property('state'),

    hasChildren: function () {
        return ($.inArray(
            this.get('func'),
            ['bulk_run', 'sync_zones']
        ) > -1);
    }.property('func'),

    hasArgs: function () {
        if (this.get('args') === '[]') {
            return false;
        } else {
            return true;
        }
    }.property('args'),

    hasKwargs: function () {
        if (this.get('kwargs') === '{}') {
            return false;
        } else {
            return true;
        }
    }.property('kwargs'),

    longArgs: function () {
        if (this.get('args_stringified').length > 150) {
            return true;
        } else {
            return false;
        }
    }.property('args'),

    longKwargs: function () {
        if (this.get('kwargs_stringified').length > 150) {
            return true;
        } else {
            return false;
        }
    }.property('kwargs'),

    logTailId: null,

    tailingLogs: function () {
        if (this.get('logTailId') === -1 || this.get('logTailId') === null) {
            return false;
        } else {
            return true;
        }
    }.property('logTailId')
});
