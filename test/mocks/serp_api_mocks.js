/*globals QuarryTest, Em, App */
QuarryTest.serpApi = function (searchAsset) {
    return {
        search: {
            /* HTTP request data */
            data: JSON.stringify(searchAsset.getProperties('asset', 'ips', 'limit',
                'offset', 'sort', 'desc')),
            /* HTTP response */
            response: {
                "data": [
                    JSON.parse(JSON.stringify(Em.Object.create(App.assetSchema).setProperties({
                        FQDN: searchAsset.get('asset.FQDN'),
                        id: 1
                    })))
                ],
                "offset": 0,
                "returned": 1,
                "status": "success",
                "total": 1
            }
        }
    };
};