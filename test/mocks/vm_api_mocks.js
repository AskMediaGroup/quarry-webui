/*globals QuarryTest */
QuarryTest.vmApi = function () {
    return {
        hypervisors: {
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
        }
    };
};