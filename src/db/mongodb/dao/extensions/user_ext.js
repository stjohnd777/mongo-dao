const ObjectID = require('mongodb').ObjectID;

module.exports = {
    /**
     * pulled from zones.js
     * @returns {Promise<any>}
     */
    getZoneByID: async (zoneID) => {

        return new Promise((resolve, reject) => {

            DAO.db.collection('stations').find({'zones._id': ObjectID(zoneID)}, {
                'zones.$_id': 1,
                timezone: 1,
                name: 1,
                _id: 1,
                status: 1
            }).toArray(function (err, items) {
                if (err) {
                    reject(err);
                } else {
                    resolve (items);
                }

            })
        })
    }


}

