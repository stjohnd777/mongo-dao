
const GetDAO = require('../../../../../_src/server/dao/AbstractDao'),
    GetDatabasePromise = require('../../../../../_src/server/db/GetDatabase'),
    GetMongoConnectionURL = require('../../../../../_src/server/db/Get_mongo_connection_url'),
    ObjectID = require('mongodb').ObjectID,
    UUID = require('../../../../../core/uuid/UUIDApi').generateUUID


let local = {
    databaseName: 'RavenData',
    hosts: [{host: 'localhost', port: '27017'}
    ]
};



async function init()  {


    let url = GetMongoConnectionURL(local);

    console.log(url);

    let db = await GetDatabasePromise(url)

    let DAO = GetDAO(db);

    DAO.db = db;

    for ( let i =0; i <10; i++) {
        let ans = await DAO['tickersCustom'].fetchById( '5967854100a00b17e604e960');
        console.log(ans);
    }

    [1,2,3].forEach( async i =>{
        let ans = await DAO['tickersCustom'].fetchById( '5967854100a00b17e604e960');
        console.log(ans);
    });


    [1,2,3].forEach( async i =>{
        DAO['tickersCustom'].fetchById( '5967854100a00b17e604e960')
            .then( ans=>{
                console.log(ans);
            })
            .catch(err =>{
                console.log(err);
            })

    });

    return DAO;
}

init();
module.exports = init;




