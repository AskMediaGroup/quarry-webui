/*globals QuarryTest */
QuarryTest.cardstackApi = function () {
    return {
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