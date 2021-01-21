const config = require('../config'),
    Get_mongo_connection_url = require('./db/mongodb/get_mongo_connection_url'),
    GetMongoDatabase = require('./db/mongodb/get_mongo_database'),
    GetDAO = require('../src/db/dao/mongo_dao'),
    dao_service = require('./rest/dao/dao_service')
    ,
    uuid_service = require('./rest/uuid/uuid_service')
    ,
    crypto_service = require('./rest/crypto/crypto_service')


async function InitDAO (){
    let local = {
        category : 'standalone',
        secured : 'false',
        databaseName: config.mongo.databaseName,
        hosts: config.mongo.hosts
    };

    let url = Get_mongodb_conn_url(local);
    let db = await GetMongoDatabase(url)
    db = db.db('automa'); // TODO : WTF
    GetDAO(db)
}

async function start_uuid_services() {
    crypto_service.start(config.services.uuid.port);
}

async function start_crypto_services() {
    uuid_service.start(config.services.crypto.port);
}

async function start_dao_services() {
    dao_service.start(config.services.dao.port);
}

async function main() {
    await InitDAO();
    await start_uuid_services();
    await start_crypto_services();
    await start_dao_services();
}

main()