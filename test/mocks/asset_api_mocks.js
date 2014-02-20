/*globals QuarryTest, App, Em */
QuarryTest.assetApi = function (searchAsset) {
    return {
        find: {
            /* HTTP request data */
            data: null,
            /* HTTP response */
            response: {
                "data": [
                    JSON.parse(JSON.stringify(Em.Object.create(App.assetSchema).setProperties({
                        FQDN: searchAsset.get('asset.FQDN'),
                        id: searchAsset.get('asset.id')
                    })))
                ],
                "offset": 0,
                "returned": 1,
                "status": "success",
                "total": 1
            }
        },
        update: {
            /* HTTP request data */
            data: JSON.stringify(App.SearchAsset.create(
                searchAsset.set('asset.Notes', 'updated')
            ).asset),
            /* HTTP response */
            response: {
                "data": [
                    JSON.parse(JSON.stringify(Em.Object.create(App.assetSchema).setProperties({
                        FQDN: searchAsset.get('asset.FQDN'),
                        id: searchAsset.get('asset.id'),
                        Notes: 'updated'
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