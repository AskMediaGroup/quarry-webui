/*global App, Em */
App.JobRoute = Em.Route.extend({
    model: function (params) {
        var that = this;
        this.controllerFor('job').setProperties({
            isLoading: true,
            uuid: params.job_uuid
        });
        return App.Jobs.find(params.job_uuid).then(
            function (job) {
                if (job.get('output.output_oid')) {
                    switch (job.get('func')) {
                    case ('run_cardstack'):
                        return App.Cardstack.get_output(
                            job.get('output.output_oid')
                        ).then(function (output) {
                            return App.Logging.find({
                                where: {
                                    'context.job.uuid': job.get('uuid')
                                }
                            }).then(
                                function success(log) {
                                    job.setProperties({
                                        logs: log.entries,
                                        output_docstore: output
                                    });
                                    that.controllerFor('job').setProperties({
                                        content: job,
                                        isLoading: false
                                    });
                                    return;
                                },
                                function failure(jqXHR) {
                                    that.controllerFor('job').setProperties({
                                        content: job,
                                        isLoading: false
                                    });
                                    return;
                                }
                            );
                        });
                    case ('run_script'):
                        return App.Command.get_output(
                            job.get('output.output_oid')
                        ).then(function (output) {
                            return App.Logging.find({
                                where: {
                                    'context.job.uuid': job.get('uuid')
                                }
                            }).then(
                                function success(log) {
                                    job.setProperties({
                                        logs: log.entries,
                                        output_docstore: output
                                    });
                                    that.controllerFor('job').setProperties({
                                        content: job,
                                        isLoading: false
                                    });
                                    return;
                                },
                                function failure(jqXHR) {
                                    that.controllerFor('job').setProperties({
                                        content: job,
                                        isLoading: false
                                    });
                                    return;
                                }
                            );
                        });
                    default:
                        break;
                    }
                } else {
                    return App.Logging.find({
                        where: {
                            'context.job.uuid': job.get('uuid')
                        }
                    }).then(
                        function success(log) {
                            job.set('logs', log.entries);
                            that.controllerFor('job').set('isLoading', false);
                            return job;
                        },
                        function failure(jqXHR) {
                            that.controllerFor('job').set('isLoading', false);
                            return job;
                        }
                    );
                }
            }
        );
    },

    serialize: function (model, params) {
        return { job_uuid: model.get('uuid') };
    },

    setupController: function (controller, model) {
        if (model) {
            controller.setProperties({
                isLoading: true,
                uuid: model.get('uuid')
            });
            App.Jobs.find(model.get('uuid')).then(
                function (job) {
                    if (job.get('output.output_oid')) {
                        switch (job.get('func')) {
                        case ('run_cardstack'):
                            App.Cardstack.get_output(
                                job.get('output.output_oid')
                            ).then(function (output) {
                                return App.Logging.find({
                                    where: {
                                        'context.job.uuid': job.get('uuid')
                                    }
                                }).then(
                                    function success(log) {
                                        job.setProperties({
                                            logs: log.entries,
                                            output_docstore: output
                                        });
                                        controller.setProperties({
                                            content: job,
                                            isLoading: false
                                        });
                                    },
                                    function failure(jqXHR) {
                                        controller.setProperties({
                                            content: job,
                                            isLoading: false
                                        });
                                    }
                                );
                            });
                            break;
                        case ('run_script'):
                            App.Command.get_output(
                                job.get('output.output_oid')
                            ).then(function (output) {
                                App.Logging.find({
                                    where: {
                                        'context.job.uuid': job.get('uuid')
                                    }
                                }).then(
                                    function success(log) {
                                        job.setProperties({
                                            logs: log.entries,
                                            output_docstore: output
                                        });
                                        controller.setProperties({
                                            content: job,
                                            isLoading: false
                                        });
                                    },
                                    function failure(jqXHR) {
                                        controller.setProperties({
                                            content: job,
                                            isLoading: false
                                        });
                                    }
                                );
                            });
                            break;
                        default:
                            break;
                        }
                    } else {
                        App.Logging.find({
                            where: {
                                'context.job.uuid': job.get('uuid')
                            }
                        }).then(
                            function success(log) {
                                job.set('logs', log.entries);
                                controller.setProperties({
                                    content: job,
                                    isLoading: false
                                });
                            },
                            function failure(jqXHR) {
                                controller.setProperties({
                                    content: job,
                                    isLoading: false
                                });
                            }
                        );
                    }
                }
            );
        }
    },

    deactivate: function () {
        if (this.controllerFor('job').get('jobRefreshId') >= 0) {
            clearInterval(this.controllerFor('job').get('jobRefreshId'));
            this.controllerFor('job').set('jobRefreshId', null);
        } else {
            this.controllerFor('job').set('jobRefreshId', null);
        }
    }
});
