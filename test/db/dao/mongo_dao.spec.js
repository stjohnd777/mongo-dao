const expect = require('chai').expect,
      should = require('chai').should(),
      UUID = require('uuid') //'../../src/api/uuid/UUIDApi')
      Get_mongo_connection_url = require('../../../src/db/get_mongo_connection_url'),
      GetMongoDatabase = require('../../../src/db/getmongo_database'),
      GetDAO = require('../../../src/db/dao/mongo_dao');

describe ("MongoDAO Tests", async function (){

    describe("MongoDB static", async function(){

        it ("global GetDAO", async ()=>{

            let local = {
                databaseName: 'automa',
                hosts: [{host: 'localhost', port: '27017'}]
            };
            let url = Get_mongo_connection_url(local);
            let db = await GetMongoDatabase(url)
            db = db.db('automa');
            expect(db).to.be.not.null;
            GetDAO(db);
            expect(DAO).to.be.not.null;
        })

        it ("static listAllCollections", async ()=>{

            let collections = await DAO.listAllCollections();
            expect(collections).to.be.not.null;
            expect(collections).to.be.an('array');

            collections.forEach( collection => {
                console.log(collection);
            })

        })

        it ("static CreateCollection", async ()=>{
                await DAO.CreateCollection('Test');
                expect(DAO['Test']).to.be.not.null;

                [0,1,2,3,4,5,6,7,8,9].forEach( async n=>{
                        await DAO['Test'].insert({ n : n, a : UUID(), b: UUID()})
                    }
                );
        })

        it ("static DropCollection", async ()=>{
            let ret = await DAO.DropCollection('Test');
            console.log(ret);
            expect(ret).to.be.true;
        })

        it ("static IsSingleUpdateSuccess")

        it ("static FindDocumentByObjectID", async ()=>{
            let doc = await DAO.FindDocumentByObjectID('5f9ee495833863eb63655c68');
            console.log(doc);
        })

        it ("FindDocumentByObjectIDSupportedCollections it should not be able to see collection that is not exposed")

        it ("static FindDocumentByObjectIDSupportedCollections", async ()=>{
            let doc = await DAO.FindDocumentByObjectIDSupportedCollections('5f9ee495833863eb63655c68');
            console.log(doc);
        })

    })

    describe("MongoDB CRUD", async function() {

        describe ("simple get operations" ,()=> {

            it("findById Happy", async () => {
                let doc = await DAO['automa'].findById('5f9ee495833863eb63655c68');
                expect(doc).is.not.null;
            })

            it("findById Sad", async () => {
                let doc = await DAO['automa'].findById('5fa4cce7b530471d7d5f1223');
                expect(doc).is.undefined;
            })

            it("getAll Happy", async () => {
                let docs = await DAO['automa'].getAll();
                expect(docs).is.not.null;
            })

            it("findAll Sad", async () => {
                try {
                    let docs = await DAO['private'].getAll();
                    expect(docs).is.null;
                } catch (e) {
                    expect(true).is.true;
                }
            })
        })


        describe ("query operations" ,()=> {

            it("query Happy", async () => {
                expect(true).is.false;
            })

            it("query Sad", async () => {
                expect(true).is.false;
            })
        });

        describe ("insert operations" ,()=> {

            it("insert Happy", async () => {
                expect(true).is.false;
            })

            it("insert Sad", async () => {
                expect(true).is.false;
            })
        })

        describe ("update operations" ,()=> {
            it("update Happy", async () => {
                expect(true).is.false;
            })

            it("update Sad", async () => {
                expect(true).is.false;
            })

            it("updateBySelector Happy", async () => {
                expect(true).is.false;
            })

            it("updateBySelector Sad", async () => {
                expect(true).is.false;
            })
        })

        describe ("delete operations" ,()=>
        {
            it("deleteById Happy", async () => {
                expect(true).is.false;
            })

            it("deleteById Sad", async () => {
                expect(true).is.false;
            })

            it("deleteBySelector Happy", async () => {
                expect(true).is.false;
            })

            it("deleteBySelector Sad", async () => {
                expect(true).is.false;
            })
        })

    });

})