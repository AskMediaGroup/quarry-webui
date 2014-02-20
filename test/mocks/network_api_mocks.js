/*globals QuarryTest, App */
QuarryTest.networkApi = function (network, updated_network, lom_network,
                                  new_network) {
    return {
        findAll: {
            /* HTTP request data */
            data: null,
            /* HTTP response */
            response: {
                "data": [
                    JSON.parse(JSON.stringify(network)),
                    JSON.parse(JSON.stringify(lom_network))
                ],
                "offset": 0,
                "returned": 2,
                "status": "success",
                "total": 2
            }
        },
        find: {
            /* HTTP request data */
            data: null,
            /* HTTP response */
            response: {
                "data": [
                    JSON.parse(JSON.stringify(network))
                ],
                "offset": 0,
                "returned": 1,
                "status": "success",
                "total": 1
            }
        },
        update: {
            /* HTTP request data */
            data: JSON.stringify(App.Network.create(updated_network)),
            /* HTTP response */
            response: {
                "data": [
                    JSON.parse(JSON.stringify(updated_network))
                ],
                "offset": 0,
                "returned": 1,
                "status": "success",
                "total": 1
            }
        },
        add: {
            /* HTTP request data */
            data: JSON.stringify(App.Network.create(new_network)),
            /* HTTP response */
            response: {
                "data": [
                    JSON.parse(JSON.stringify(new_network))
                ],
                "offset": 0,
                "returned": 1,
                "status": "success",
                "total": 1
            }
        },
        remove: {
            /* HTTP request data */
            data: null,
            /* HTTP response */
            response: {
                "data": [
                    JSON.parse(JSON.stringify(network))
                ],
                "offset": 0,
                "returned": 1,
                "status": "success",
                "total": 1
            }
        }
    };
};