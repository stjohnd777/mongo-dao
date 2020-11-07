const GetDAO = require('../src/db/dao/mongo_dao'),
    GetDatabasePromise = require('../src/db/getmongo_database'),
    GetMongoConnectionURL = require('../src/db/get_mongo_connection_url')


async function init()  {
    let local = {
        databaseName: 'automa',
        hosts: [{host: 'localhost', port: '27017'}]
    };

    let url = Get_mongo_connection_url(local);
    let db = await GetDatabasePromise(url)
    db = db.db('automa');
    GetDAO(db);

    // try {
    //     let collections = await DAO.listAllCollections();
    //     console.log(collections);
    // } catch (e){
    //     console.log(e);
    // }
    return DAO;
}

(async () =>{
    await init();
})();


module.exports = init;




