/*globals QuarryTest */
QuarryTest.jobApi = function () {
    return {
        cardrunner: {
            /* HTTP request data */
            data: null,
            /* HTTP response */
            response: {
                "status": "success",
                "total": 1,
                "data": [
                    {
                        "user_id": 19,
                        "job_id": 10940341,
                        "tags": null,
                        "start_time": 1384795490,
                        "args": "[1, {\"FQDN\": \"francis\"}]",
                        "module": "cardrunner.api",
                        "parent_id": null,
                        "state": 10,
                        "end_time": 1384795513,
                        "func": "run_cardstack",
                        "kwargs": "{}",
                        "queue_time": 1384795490,
                        "path": "/1/run",
                        "output": {
                            "output_oid": "528a4d6325d5d42cdc9eca22"
                        },
                        "uuid": "af772f17-dcd3-4732-a358-5189170801ac"
                    }
                ],
                "returned": 1,
                "offset": 0
            }
        },
        dns_sync: {
            /* HTTP request data */
            data: null,
            /* HTTP response */
            response: {
                "status": "success",
                "total": 1,
                "data": [
                    {
                        "user_id": 7,
                        "parent_uuid": null,
                        "tags": null,
                        "start_time": 1384807710,
                        "args": "[]",
                        "module": "quarry.backend.dns.api",
                        "output": null,
                        "state": 10,
                        "end_time": 1384807712,
                        "func": "sync_zones",
                        "kwargs": "{}",
                        "queue_time": 1384807709,
                        "path": null,
                        "uuid": "1ac7ca8c-4eed-4ee9-9712-cd0332f8c4aa"
                    }
                ],
                "returned": 1,
                "offset": 0
            }
        },
        dns_sync_children: {
            /* HTTP request data */
            data: null,
            /* HTTP response */
            response: {
                "status": "success",
                "total": 1,
                "data": [
                    {
                        "user_id": null,
                        "parent_uuid": "1ac7ca8c-4eed-4ee9-9712-cd0332f8c4aa",
                        "tags": null,
                        "start_time": 1384807711,
                        "args": "[1]",
                        "module": "quarry.backend.dns.api",
                        "output": null,
                        "state": 10,
                        "end_time": 1384808011,
                        "func": "sync_zone",
                        "kwargs": "{}",
                        "queue_time": 1384807710,
                        "path": null,
                        "uuid": "a0d974f4-9daa-4695-b485-21c6dd851bd6"
                    }
                ],
                "returned": 1,
                "offset": 0
            }
        },
        myJobs: {
            /* HTTP request data */
            data: null,
            /* HTTP response */
            response: {
                "status": "success",
                "total": 1,
                "data": [
                    {
                        "user_id": 7,
                        "parent_uuid": null,
                        "tags": null,
                        "start_time": 1381524433,
                        "args": "[11, {\"FQDN\": \"francis\"}]",
                        "module": "cardrunner.api",
                        "output": null,
                        "state": 10,
                        "end_time": 1381524451,
                        "func": "run_cardstack",
                        "kwargs": "{}",
                        "queue_time": null,
                        "path": null,
                        "uuid": "40aa633a-64d3-4ce9-a566-0ec9835ae509"
                    }
                ],
                "returned": 1,
                "offset": 0
            }
        }
    };
};