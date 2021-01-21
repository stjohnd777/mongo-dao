const GetMongoConnectionURL = require("../../src/db/mongodb/get_mongo_connection_url")

// mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]

describe("Get MongoDatabaseURL", function(){

    it("should get create a standalone open mongodb database connection url ",async ()=>{
        // stand alone
        //mongodb://mongodb0.example.com:27017
         let url = ""
    })


    it("should get create a standalone authenticated mongodb database connection url ",async ()=>{
        //mongodb://myDBReader:D1fficultP%40ssw0rd@mongodb0.example.com:27017/?authSource=admin
        let url = ""
    })

    it("should get create a replica mongodb database connection url ",async ()=>{
        //mongodb://mongodb0.example.com:27017,mongodb1.example.com:27017,mongodb2.example.com:27017/?replicaSet=myRepl
        let url = ""
    })


    it("should get create a replica auth mongodb database connection url ",async ()=>{
        //mongodb://myDBReader:D1fficultP%40ssw0rd@mongodb0.example.com:27017,mongodb1.example.com:27017,mongodb2.example.com:27017/?authSource=admin&replicaSet=myRepl
        let url = ""
    })


    it("should get create a clustered  mongodb database connection url ",async ()=>{
        //mongodb://mongos0.example.com:27017,mongos1.example.com:27017,mongos2.example.com:27017
        let url = ""
    })

    it("should get create a clustered auth mongodb database connection url ",async ()=>{
          //mongodb://myDBReader:D1fficultP%40ssw0rd@mongos0.example.com:27017,mongos1.example.com:27017,mongos2.example.com:27017/?authSource=admin
        let url = ""
    })
})