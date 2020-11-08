module.exports = {
    GetMongoConnectionURL : require('src/db/get_mongo_connection_url')
    ,
    GetMongoDatabasePromise : require('src/db/get_mongo_database')
    ,
    ConfigDAO : require("./config_mongo_dao")
    ,
    GetDAO : reire('./dao/mongo_dao')
    ,
    DAO : global.DAO
}