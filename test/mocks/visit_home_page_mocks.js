/*globals QuarryTest, Em, App */
QuarryTest.homePage = function () {
    return {
        hypervisorFind: {
            /* HTTP request data */
            data: null,
            /* HTTP response */
            response: {
                "data": [
                    JSON.parse(JSON.stringify({
                        "asset_id": 1,
                        "guest_prod_type": "Staging",
                        "memory_free": 30363,
                        "storage_free": 0,
                        "memory_total": 32762,
                        "storage_total": 0,
                        "version": "4.0",
                        "active": true,
                        "type": "xen",
                        "name": "testhost001lax.mydomain"
                    }))
                ],
                "offset": 0,
                "returned": 1,
                "status": "success",
                "total": 1
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
        },
        cardstacks: {
            /* HTTP request data */
            data: null,
            /* HTTP response */
            response: {
                "status": "success",
                "total": 1,
                "data": [
                    {
                        "cards": [
                            {
                                "content_oid": "524360e200537560909e78fe",
                                "command": "sudo /etc/init.d/httpd status",
                                "card_id": 11,
                                "name": "httpd status"
                            }
                        ],
                        "query": null
                    }
                ],
                "returned": 1,
                "offset": 0
            }
        }
    };
};