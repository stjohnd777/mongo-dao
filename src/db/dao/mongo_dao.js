const ObjectID = require('mongodb').ObjectID,
     daoConf = require('../config_mongo_dao');

/**
 * default query limit
 * @type {number}
 */
let maxDocs = 100000;

/**
 * logging
 *
 * @type {boolean}
 */
let log = false;

// TODO : move the log function to RavenLogger in seperate ticket when adressing other logger issues.
function logInfo(msg,obj) {

    if(log) {
        if (global.RavenLogger) {

            RavenLogger.info(msg,obj);
        }
    }
}

function logDebug(msg,obj) {

    if(log) {
        if (global.RavenLogger) {

            RavenLogger.debug(msg,obj);
        }
    }
}

function logWarn(msg,obj) {

    if(log) {
        if (global.RavenLogger) {

            RavenLogger.warn(msg,obj);
        }
    }
}

function logError(msg,obj) {

    if(log) {
        if (global.RavenLogger) {

            RavenLogger.error(msg,obj);
        }
    }
}


/**
 * Generic CRUD operations for on MongoDB at the collection level
 */
class Mongo_dao {

    /**
     * @constructor
     * @param database - MongoDB database object
     * @param collectionName - MongoDB colllectionName
     */
    constructor(database, collectionName) {
        Mongo_dao.db = database; // Humm .. could be problematic in a many db env, I am aware, only one now.
        this.db = database;
        this.collectionName = collectionName;
    }

    /**
     * fetch document with id
     *
     * remark:
     *
     * {"_id": id instanceof ObjectID ? id : ObjectID(id)}
     *
     * @param id - can be string or ObjectId (object)
     * @returns {Promise<any>}
     */
    fetchById(id) {

        logInfo(`promise fetchById(${id})`);

        let promise = new Promise((resolve, reject) => {

            this._fetchById(id, (err, res) => {
                if (err) {
                    logError(`reject fetchById(${this.collectionName})`, err);
                    reject(err)
                } else {
                    logInfo(`resolve fetchById(${this.collectionName})`, res);
                    resolve(res);
                }
            })
        });

        return promise;
    }

    /**
     * find document with id
     *
     * remark:
     *
     * {"_id": id instanceof ObjectID ? id : ObjectID(id)}
     * @param id
     * @returns {Promise<any>}
     */
    findById (id) {
       return this.fetchById(id)
    }


    /**
     * fetch document with id
     *
     * remark:
     *
     * {"_id": id instanceof ObjectID ? id : ObjectID(id)}
     *
     * @param id - can be string or ObjectId (object)
     * @param callback - callback (err,res)
     * @private
     */
    _fetchById(id, callback) {

        logInfo(`_fetchById(${this.collectionName})`);

        try {
            this.db.collection(this.collectionName).find({"_id": id instanceof ObjectID ? id : ObjectID(id)}).toArray((err, res) => {
                if (!err && res) {
                    logInfo(`_fetchById(${this.collectionName})`,res);
                    callback(undefined, res.length === 1 ? res[0] : undefined);
                } else {
                    logError(`_fetchById(${this.collectionName})`,err);
                    callback(err || 'no scene found', undefined);
                }
            });
        } catch (e) {
            callback(e, undefined);
        }

    }

    FindById(id,callback = undefined) {

        if (callback){
            this.db.collection(this.collectionName).find({"_id": id instanceof ObjectID ? id : ObjectID(id)}).toArray((err, res) => {
                if (!err && res) {
                    logInfo(`_fetchById(${this.collectionName})`,res);
                    callback(undefined, res.length === 1 ? res[0] : undefined);
                } else {
                    logError(`_fetchById(${this.collectionName})`,err);
                    callback(err || 'no scene found', undefined);
                }
            });
            return undefined;
        } else {

            let promise = new Promise((resolve, reject) => {
                this.db.collection(this.collectionName).find({"_id": id instanceof ObjectID ? id : ObjectID(id)}).toArray((err, res) => {
                    if (!err && res) {
                        logInfo(`_fetchById(${this.collectionName})`,res);
                        resolve(undefined, res.length === 1 ? res[0] : undefined);
                    } else {
                        logError(`_fetchById(${this.collectionName})`,err);
                        reject(err || 'no scene found', undefined);
                    }
                });
            });
            return promise;
        }
    }

    /**
     * fetch all documents in collection
     *
     * @param limit - max documents to return
     * @param sortCriterion - sort criterion default { _id : -1}
     *
     * @returns {Promise<any>}
     */
    fetchAll(limit = maxDocs, sortCriterion = {_id: -1}) {

        logInfo(`promise fetchAll() `);

        let promise = new Promise((resolve, reject) => {

            logInfo(`execute fetchAll(${this.collectionName})`);

            this._fetchAll(limit, sortCriterion, (err, res) => {
                if (err) {
                    logError(`reject fetchAll(${this.collectionName})`, err);
                    reject(err)
                } else {
                    logInfo(`resolve fetchAll(${this.collectionName})`, res);
                    resolve(res);
                }
            })
        });

        return promise;
    }

    /**
     *
     * @param limit
     * @param sortCriterion
     * @returns {Promise<any>}
     */
    getAll(limit = maxDocs, sortCriterion = {_id: -1}) {
        return this.fetchAll(limit,sortCriterion);
    }


    /**
     * fetch all documents in collection
     *
     * @param limit - max documents to return
     * @param sortCriterion - sort criterion default { _id : -1}
     * @param callback - callback (err,res)
     * @private
     */
    _fetchAll(limit = maxDocs, sortCriterion = {_id: -1}, callback) {

        logInfo(`_fetchAll(${this.collectionName})`);

        try {
            this.db.collection(this.collectionName).find({}).limit(limit).sort(sortCriterion).toArray((err, res) => {
                callback(err, res)
            });
        } catch (e) {
            logError(`_fetchAll(${this.collectionName})`,e);
            callback(e);
        }
    }

    /**
     * query documents
     *
     * @param querySelector
     * @param limit
     * @param sortCriterion
     *
     * @returns {Promise<any>}
     */
    query(querySelector, limit = maxDocs, sortCriterion = {_id: -1}) {

        logDebug(`promise query(${querySelector}),${limit},${sortCriterion}`);

        return  new Promise((resolve, reject) => {

            this._query(querySelector, limit, sortCriterion, (err, res) => {
                if (err) {
                    logError(`reject: querySelector (${querySelector}),${limit},${sortCriterion}`, err);
                    reject(err);
                } else {
                    logDebug(`resolve: querySelector (${querySelector}),${limit},${sortCriterion}`, res);
                    resolve(res);
                }
            });
        });
    }

    /**
     *
     * query documents
     *
     * @param querySelector
     * @param limit
     * @param sortCriterion
     * @param callback
     * @returns {Promise}
     * @private
     */
    _query(querySelector, limit = maxDocs, sortCriterion = {_id: -1}, callback) {

        logDebug(`callback query(${querySelector}),${limit},${sortCriterion}`);

        try {
            this.db.collection(this.collectionName).find(querySelector).sort(sortCriterion).limit(limit).toArray((err, res) => {
                callback(err, res);
            });
        } catch (e) {
            logError(`_query ${querySelector} ${limit} ${sortCriterion}`,  e)
            callback(e);
        }

    }

    /**
     * insert document
     *
     * @param entity
     */
    insert(entity) {


        logInfo(`promise insert(${entity})`);

        let promise = new Promise((resolve, reject) => {

            this._insert(entity, (err, res) => {
                if (err) {
                    logError(`reject: insert(${entity})`, err);
                    reject(err)
                } else {
                    logInfo(`resolve insert(${entity})`, res);
                    resolve(res)
                }
            })

        });
        return promise;
    }

    /**
     *
     * insert document
     *
     * @param entity
     * @param callback
     * @private
     */
    _insert(entity, callback) {

        try {
            this.db.collection(this.collectionName).insertOne(entity, (err, res) => {
                callback(err, res);
            });
        } catch (e) {
            logError(`_insert ${enitiy}`, e )
            callback(e);
        }
    }

    /**
     * update document(s)
     *
     * @param querySelector
     * @param newvalues
     * @param options
     *
     * db.collection.update(
     * <query>,
     * <update>,
     *{
     *  upsert: <boolean>,
     *  multi: <boolean>,
     *  writeConcern: <document>,
     *  collation: <document>,
     *  arrayFilters: [ <filterdocument1>, ... ]
     * }
     * )
     * @returns Promise<any>
     */
    updateBySelector(querySelector, newvalues, options = {upsert : false} ) {

        logInfo(`promise updateBySelector(${querySelector}, ${newvalues}) , ${options} )`);

        let promise = new Promise((resolve, reject) => {

            this._updateBySelector(querySelector, newvalues,options, (err, res) => {
                if (err) {
                    logError(`reject : updateBySelector(${querySelector}, ${newvalues}) , ${options} )`, err);
                    reject(err)
                } else {
                    logInfo(`resolve : updateBySelector( ${querySelector}, ${newvalues}) , ${options} )`, res);
                    resolve(res)
                }
            });

        });

        return promise;
    }

    update(querySelector, newvalues, options = {upsert : false} ) {

        return this.updateBySelector(querySelector, newvalues, options);
    }

    updateOne(querySelector, newvalues){
        return new Promise((resolve, reject)=> {
            this.db.collection(this.collectionName).updateOne(querySelector,  newvalues, (err, res) => {
                if (err) {
                    logError(`reject : updateOne(${querySelector}, ${newvalues} )`, err);
                    reject(err)
                } else {
                    logInfo(`resolve : updateOne( ${querySelector}, ${newvalues} )`, res);
                    resolve(res)
                }
            });
        });
    }

    /**
     * update document(s)
     *
     * @param querySelector
     * @param newvalues
     * @param options
     *
     * db.collection.update(
     * <query>,
     * <update>,
     *{
     *  upsert: <boolean>,
     *  multi: <boolean>,
     *  writeConcern: <document>,
     *  collation: <document>,
     *  arrayFilters: [ <filterdocument1>, ... ]
     * }
     * @private
     */
    _updateBySelector(querySelector, newvalues,options, callback) {

        try {
            this.db.collection(this.collectionName).updateOne(querySelector,  newvalues, options, (err, res) => {
                callback(err, res)
            });
        } catch (e) {
            callback(e);
        }

    }

        /**
     * update document(s)
     *
     * @param querySelector
     * @param newvalues
     * @returns Promise<any>
     */
    upsertBySelector(querySelector, newvalues) {

        logInfo(`promise upsertBySelector(${querySelector},${newvalues})`);

        let promise = new Promise((resolve, reject) => {

            this._upsertBySelector(querySelector, newvalues, (err, res) => {
                if (err) {
                    logError(`reject : upsertBySelector(${querySelector})`, err);
                    reject(err)
                } else {
                    logInfo(`resolve : upsertBySelector(${querySelector})`);
                    resolve(res)
                }
            });

        });

        return promise;
    }

    /**
     * update document(s)
     *
     * @param querySelector
     * @param newvalues
     * @param callback
     * @private
     */
    _upsertBySelector(querySelector, newvalues, callback) {

        try {
            this.db.collection(this.collectionName).updateOne(querySelector, {$set:newvalues}, 
                {
                 upsert: true
                }, 
                (err, res) => {
                    callback(err, res)
                }
            );
        } catch (e) {
            callback(e);
        }

    }


    deleteById(id) {

        logInfo(`promise deleteById(${id})`);

        let promise = new Promise((resolve, reject) => {

            this._deleteById(id, (err, res) => {
                if (err) {
                    logError(`reject deleteById(${this.collectionName})`, err);
                    reject(err)
                } else {
                    logInfo(`resolve deleteById(${this.collectionName})`, res);
                    resolve(res);
                }
            });
        });

        return promise;
    }

    _deleteById(id, callback) {

        logInfo(`_deleteById(${id})`);

        try {
            this.db.collection(this.collectionName).deleteOne({"_id": id instanceof ObjectID ? id : ObjectID(id)}, (err, res) => {
                callback(err, res)
            });
        } catch (e) {
            callback(e)
        }
    }

    /**
     * delete document(s)
     *
     * @param   querySelector
     * @returns {Promise<any>}
     */
    deleteBySelector(querySelector) {

        logInfo(`promise deleteBySelector(${querySelector})`);

        let promise = new Promise((resolve, reject) => {

            logInfo(`execute deleteBySelector(${querySelector})`);

            this.__deleteBySelector(querySelector, (err, res) => {
                if (err) {
                    logError(`reject : deleteBySelector(${querySelector})`, err);
                    reject(err);
                } else {
                    logInfo(`resolved : deleteBySelector(${querySelector})`, res);
                    resolve(res)
                }
            })
        });

        return promise;
    }


    /**
     * delete documents
     *
     * @param querySelector
     * @param callback
     * @private
     */
    _deleteBySelector(querySelector, callback) {

        logInfo(`_deleteBySelector(${querySelector})`);

        try {
            this.db.collection(this.collectionName).deleteOne(querySelector, function (err, res) {
                callback(err, res)
            });
        } catch (e) {
            callback(e)
        }

    }
}


/**
 * Expose static utilities needed for database access
 *
 * <ul>
 *     <li>listAllCollections</li>
 *     <li>CreateCollection</li>
 *     <li>DropCollection</li>
 * </ul>
 *
 * @param db
 * @param DAO
 */
function addStaticFunctions(db, DAO) {

    /**
     * query the collections on the database
     *
     * @returns {Promise}
     */
    DAO.listAllCollections  = (database = DAO.db) =>{

        return new Promise((resolve, reject) => {
            database.listCollections().toArray(function(err, collInfos) {
                if (err) {
                    logError(`reject ListAllCollections(${this.collectionName})`, err);
                    reject(err)
                } else {
                    logInfo(`resolve ListAllCollections(${this.collectionName})`, collInfos);
                    resolve(collInfos);
                }
            });
        });
    }

    /**
     * Create a collection
     *
     * @param collectionName
     * @param callback
     * @returns {Promise<any>}
     * @constructor
     */
    DAO.CreateCollection = (collectionName,database = DAO.db) => {

        return new Promise((resolve, reject) => {

            database.collection(collectionName, (err, res) => {
                if (err) {
                    logError(`reject CreateCollection(${this.collectionName})`, err);
                    reject(err)
                } else {
                    logInfo(`resolve CreateCollection(${this.collectionName})`, res);
                    let dao = new Mongo_dao(db,collectionName)
                    DAO[collectionName] = dao;
                    resolve(dao);
                }
            })
        });

    };

    /**
     * Create a collection with callback
     *
     * @param collectionName
     * @param callback
     * @private
     */
    DAO._CreateCollection = (database,collectionName, callback) =>{


        try {
            database.collection(collectionName, (err, res) => {
                callback(err, res);
            });
        } catch (e) {
            callback(e);
        }
    };

    /**
     *
     * drop collection name from database
     *
     * @param database
     * @param collectionName
     * @returns {Promise}
     * @constructor
     */
    DAO.DropCollection = (collectionName,database = DAO.db) => {

        return new Promise((resolve, reject) => {

            database.collection(collectionName).drop((err, res) => {
                if(err){
                    reject(err)
                }else{
                    resolve(res)
                }
            });

        });

    };

    DAO.IsSingleUpdateSuccess = (resultsUpdate) => {
        return (resultsUpdate.matchedCount == 1 && resultsUpdate.result.ok == 1);
    };

    let keys = Object.keys(daoConf);

    DAO.FindDocumentByObjectID = async (id) => {

        let doc = undefined;
        let collection = undefined;
        let is_found = false;

        id = id instanceof ObjectID ? id :  ObjectID(id);

        let collections = await  DAO.listAllCollections() ;
        for ( let col of collections) {
            try {
                let aDoc = await DAO[col.name].findById(id);
                if (aDoc !== undefined) {
                    doc = aDoc;
                    collection = col.name;
                    is_found = true;
                    break;
                }
            }catch (ex) {
                console.log(ex);
            }
        }
        return { is_found:is_found , oid : id.toString(), collection : collection , doc : doc };
    }

    DAO.FindDocumentByObjectIDSupportedCollections = async (id) => {
        let doc = undefined;
        let collection = undefined;
        let is_found = false;

        id = id instanceof ObjectID ? id :  ObjectID(id);
        let keys = Object.keys(daoConf);

        for ( let col of keys) {
            try {
                let aDoc = await DAO[col].findById(id);
                if (aDoc !== undefined) {
                    doc = aDoc;
                    collection = col.name;
                    is_found = true;
                    break;
                }
            }catch (ex) {
                console.log(ex);
            }
        }
        return {   is_found :is_found, oid : id.toString(), collection : collection , doc : doc };
    }

}


/**
 * Get the DAO object, if constructed get the cashed object
 *
 * @param database
 * @returns {*}
 */
function GetDAO(database = global.db) {

    logDebug('GetDAO');

    // if the we have already constructed the the DAO return it
    if (global.DAO) {
        logDebug('GetDAO returns cashed object');
        return global.DAO;
    }

    //global.DAO.db = database;

    try {

        logDebug('Construct DAO, expose as global');

        let DAO = {};

        DAO.cols = [];

        let keys = Object.keys(daoConf);

        //logInfo(keys);

        // if ( daoConf.pull_all === true ){
        //
        //     let p = new Promise((resolve, reject) => {
        //         database.listCollections().toArray(function (err, collInfos) {
        //             if (err) {
        //                 logError(`reject ListAllCollections(${this.collectionName})`, err);
        //                 reject(err)
        //             } else {
        //                 logInfo(`resolve ListAllCollections(${this.collectionName})`, collInfos);
        //                 resolve(collInfos);
        //             }
        //         });
        //     });
        //     let col = await p;
        //     col.forEach( c=>{
        //        keys[c.name] = {};
        //     });
        //
        //
        //
        // }else {
        //     keys = Object.keys(daoConf);
        // }

        keys.forEach(name => {

            DAO.cols.push(name);

            //logInfo(`DuckType[${name}] ${daoConf[name]}`);

            let aDao = {};
            if (!daoConf[name].hasOwnProperty('isAbstraction')) {
                aDao = new Mongo_dao(database, name);
                aDao.isAbstract = false;
            }else {
                aDao.isAbstract = true;
                aDao.db = database;
                aDao.database = database;
            }

            let aDoaExt = daoConf[name].extension;
            if (aDoaExt) {
                var daoExt = Object.assign(aDao, aDoaExt);
            } else {
                var daoExt = aDao;
            }
            daoExt.db = database;

            DAO[name] = daoExt
        });

        global.DAO = DAO;

        DAO.db = database;
        DAO.database = database;

        addStaticFunctions(database ,DAO);

        return DAO;

    } catch (e) {
        logError('Error while processing GetDAO', e)
        throw e;
    }

}
module.exports = GetDAO;





