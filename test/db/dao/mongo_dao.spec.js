const expect = require('chai').expect,
      should = require('chai').should(),
      UUID = require('uuid') //'../../src/api/uuid/UUIDApi'),
      ObjectID = require('mongodb').ObjectID,
      Get_mongo_connection_url = require('../../../src/db/get_mongo_connection_url'),
      GetMongoDatabase = require('../../../src/db/get_mongo_database'),
      GetDAO = require('../../../src/db/dao/mongo_dao');

let _id;
let a =  UUID();
let b =  UUID();


describe ("MongoDAO Tests", async function (){

    before("create Test", async function (){

        // connect to url for your mongo database
        let local = {
            databaseName: 'automa',
            hosts: [{host: 'localhost', port: '27017'}]
        };
        let url = Get_mongo_connection_url(local);
        expect(url).to.be.not.null;
        expect(url).to.be.not.undefined;

        // get the db connection object from url
        let db = await GetMongoDatabase(url)
        expect(db).to.be.not.undefined;
        db = db.db('automa');
        expect(db).to.be.not.null;
        expect(db).to.be.not.undefined;

        GetDAO(db);
        expect(DAO).to.be.not.null;
        expect(DAO).to.be.not.undefined;

        // drop previous run
        await DAO.DropCollection('Test');

        // create collection
        await DAO.CreateCollection('Test');

        // insert 10 records
        for (let n =0; n <10 ; n++)
        {
            try {
                let ret = await DAO['Test'].insert({n: n, a: UUID(), b: UUID()});
                expect(ret.result.ok == 1).true
            } catch (e) {
                console.log(e);
            }
        }

        let ret = await DAO['Test'].insert({ n : -1, a :a, b: b})
        expect(ret.result.ok == 1).true

        let doc = await  DAO['Test'].query( {n:-1});
        _id = doc[0]._id.toString();

    })

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
        }).skip() // moved to before

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
        }).skip() // moved to before

        it ("static DropCollection", async ()=>{
            let ret = await DAO.DropCollection('Test');
            console.log(ret);
            expect(ret).to.be.true;
        }).skip() // keep it

        it ("static IsSingleUpdateSuccess") // todo

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

    describe("MongoDB CRUD", async function(done) {

        describe ("simple get operations" ,()=> {

            it("FindById Happy", async () => {

                let oid = ObjectID(_id)

                //5fa6e26a267c9c124cc52c21
                let doc = await DAO['Test'].FindById(_id);
                expect(doc).is.not.undefined;
                expect(doc._id.toString()).equals(_id);

                doc = await DAO['Test'].FindById(oid);
                expect(doc).is.not.null;
                expect(doc._id.toString()).equals(_id);

                DAO['automa'].FindById('5fa6daebf84a2207c7407ad2',(err,res)=>{
                    expect(res).is.not.null;
                    expect(doc._id.toString()).equals(_id);
                    done();
                });

                DAO['automa'].FindById(oid,(err,res)=>{
                    expect(res).is.not.null;
                    expect(doc._id.toString()).equals(_id);
                    done();
                });

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


        describe ("query operations" ,async ()=> {

            it("query Happy", async () => {

                // await DAO.DropCollection('Test');
                // await DAO.CreateCollection('Test');
                // expect(DAO['Test']).to.be.not.null;

                // // for (let n =0; n <10 ; n++)
                // // {
                // //     try {
                // //         await DAO['Test'].insert({n: n, a: UUID(), b: UUID()});
                // //     } catch (e) {
                // //         console.log(e);
                // //     }
                // // }
                //
                // await DAO['Test'].insert({ n : -1, a :a, b: b})

                let docs = await DAO['Test'].query({ a :a });
                console.log(docs);
                expect(docs[0].a).equals(a);
                //await DAO.DropCollection('Test');
            })

        });

        describe ("insert operations" ,()=> {

            it("insert Happy", async () => {
                expect(DAO['Test']).to.be.not.null;
                let ret = await DAO['Test'].insert({ n : -1, a :a, b: b})
                expect(ret.result.ok == 1).true
            })

        })

        describe ("update operations" ,()=> {

            it("updateOne Happy", async () => {
                expect(DAO['Test']).to.be.not.null;
                let c = UUID();
                let ret = await DAO['Test'].updateOne({ a : a}, { c: c});
                expect(ret.result.ok == 1).true
                let docs = await DAO['Test'].query(  { c: c});
                console.log(docs);
                expect(docs[0].c).equals(c);
            })

        })

        describe ("delete operations" ,()=>
        {
            it("deleteById Happy", async () => {
                expect(true).is.false;
            })

            it("deleteBySelector Happy", async () => {
                expect(true).is.false;
            })

        })

    });

})