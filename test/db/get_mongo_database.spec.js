const GetDatabasePromise = require("../../src/db/mongodb/get_mongo_database")

describe("Get Database", function(){

    it("should get a mongodb database connection",async ()=>{

        // mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]

        // stand alone
            //mongodb://mongodb0.example.com:27017
            //mongodb://myDBReader:D1fficultP%40ssw0rd@mongodb0.example.com:27017/?authSource=admin

        // replica set url
            //mongodb://mongodb0.example.com:27017,mongodb1.example.com:27017,mongodb2.example.com:27017/?replicaSet=myRepl
            //mongodb://myDBReader:D1fficultP%40ssw0rd@mongodb0.example.com:27017,mongodb1.example.com:27017,mongodb2.example.com:27017/?authSource=admin&replicaSet=myRepl

        // cluster
            //mongodb://mongos0.example.com:27017,mongos1.example.com:27017,mongos2.example.com:27017
            //mongodb://myDBReader:D1fficultP%40ssw0rd@mongos0.example.com:27017,mongos1.example.com:27017,mongos2.example.com:27017/?authSource=admin

        let url = "mongodb://localhost:27017"
        let db = await GetDatabasePromise(url);
    })
})