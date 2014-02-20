/*globals QuarryTest */
QuarryTest.loggingApi = function () {
    return {
        findJob: {
            /* HTTP request data */
            data: null,
            /* HTTP response */
            response: {
                "status": "success",
                "total": 1,
                "data": [
                    {
                        "context": {
                            "job": {
                                "user_id": 19,
                                "uuid": "af772f17-dcd3-4732-a358-5189170801ac",
                                "args": "[1, {\"FQDN\": \"francis\"}]",
                                "func": "run_cardstack",
                                "kwargs": "{}",
                                "path": "/1/run"
                            },
                            "host": "testhost.mydomain"
                        },
                        "level": "DEBUG",
                        "module": "woodstove.async.worker",
                        "func": "callback",
                        "time": 1384795491.0477231,
                        "path": "/usr/lib/pymodules/python2.6/woodstove/async/worker.py",
                        "message": "Calling run_cardstack(*u'[1, {\"FQDN\": \"francis\"}]', **u'{}')",
                        "_id": "528a4d6325d5d42cdc9eca21",
                        "line": 95
                    }
                ],
                "returned": 1,
                "offset": 0
            }
        }
    };
};