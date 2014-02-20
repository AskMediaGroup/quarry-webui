/*globals QuarryTest, App */
QuarryTest.kickstartApi = function (kickstarts) {
    return {
        find: {
            /* HTTP request data */
            data: null,
            /* HTTP response */
            response: {
                "data": [
                    {
                        "available": kickstarts[0].get('available'),
                        "filename": kickstarts[0].get('filename'),
                        "id": kickstarts[0].get('id'),
                        "name": kickstarts[0].get('name')
                    },
                    {
                        "available": kickstarts[1].get('available'),
                        "filename": kickstarts[1].get('filename'),
                        "id": kickstarts[1].get('id'),
                        "name": kickstarts[1].get('name')
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