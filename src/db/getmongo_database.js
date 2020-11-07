const MongoClient = require('mongodb').MongoClient;

/**
 * Get MongoDB connection for url
 *
 * @param config
 * @returns {Promise<any>}
 */
module.exports =  GetMongoDatabasePromise = (url) =>{

    let p = new Promise((resolve, reject) => {

        MongoClient.connect(url, function(err, db) {
            if (err) {
                reject(err);
            }else {
                resolve(db)
            }
        });
    });
    return p;
};

