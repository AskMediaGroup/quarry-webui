/*globals QuarryTest, App */
QuarryTest.osTargetApi = function (osTargets) {
    return {
        find: {
            /* HTTP request data */
            data: null,
            /* HTTP response */
            response: {
                "data": [
                    {
                        "available": osTargets[0].get('available'),
                        "filename": osTargets[0].get('filename'),
                        "id": osTargets[0].get('id'),
                        "name": osTargets[0].get('name')
                    },
                    {
                        "available": osTargets[1].get('available'),
                        "filename": osTargets[1].get('filename'),
                        "id": osTargets[1].get('id'),
                        "name": osTargets[1].get('name')
                    }
                ],
                "offset": 0,
                "returned": 2,
                "status": "success",
                "total": 2
            }
        }
    };
};