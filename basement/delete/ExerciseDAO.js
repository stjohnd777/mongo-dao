const GetDAO = require('../../src/db/dao/mongo_dao'),
    GetDatabasePromise = require('../../src/db/getmongo_database'),
    GetMongoConnectionURL = require('../../src/db/get_mongo_connection_url'),
    ObjectID = require('mongodb').ObjectID


async function test() {

    try {

        let local = {
            databaseName: 'automa',
            hosts: [{host: 'localhost', port: '27017'}
            ]
        };

        let url = Get_mongo_connection_url(local);

        let db = await GetDatabasePromise(url)

        let dao = GetDAO(db);

        let automa = await DAO['automa'].fetchAll()

        // try {
        //     console.log(uuid);
        //     // test the prototype methods
        //     console.log('>>> fetchAll');
        //     let docs = await dao['tickerCrawls'].fetchAll();
        //     console.log(docs);
        // } catch (x) {
        //     console.log(x);
        // }
        // try {
        //     console.log('>>> fetchById');
        //     let _id = '5551137b911c09371f74a332'
        //     let aDoc = await dao['tickerCrawls'].fetchById(_id);
        //     console.log(aDoc);
        // } catch (x) {
        //     console.log(x);
        // }
        //
        // try {
        //     console.log('>>>');
        //     let objectId = ObjectID('5551137b911c09371f74a332')
        //     let aDoc2 = await dao['tickerCrawls'].fetchById(objectId);
        //     console.log(aDoc2);
        // } catch (x) {
        //     console.log(x);
        // }
        //
        //
        // try {
        //     console.log('>>> query');
        //     let queriedDocs = await dao['tickerCrawls'].query(
        //         {
        //             zoneID: ObjectID('54e4f4442861e36744edafc1')
        //             ,
        //             type: "Top Line"
        //         });
        //     console.log(queriedDocs);
        // } catch (x) {
        //     console.log(x);
        // }
        //
        //
        // try {
        //     console.log('>>> insert');
        //     let newdoc = {
        //         zoneID: 'somezoneeid',
        //         stationID: 'somestationid',
        //         type: "Bottom Line",
        //         dateModified: "2018-02-09T13:44:27.342Z",
        //         items: [
        //             {
        //                 type: "contentFeeds",
        //                 sourceID: "592316543199392282de54a0"
        //             },
        //             {
        //                 type: "trafficIncidents",
        //                 sourceID: "5808c92c9ade9076050ece04"
        //             },
        //             {
        //                 type: "traffic",
        //                 sourceID: "57d199f1ef4709fb509d0659"
        //             },
        //             {
        //                 type: "traffic",
        //                 sourceID: "57d199f1ef4709fb509d065a"
        //             },
        //             {
        //                 type: "traffic",
        //                 sourceID: "57e4070aa267594824a15441"
        //             }
        //         ],
        //         lastFilesTransferred: [
        //             "/SuperCrawl/content-592316d93199392282de54b3.txt",
        //             "/SuperCrawl/content-592316543199392282de54a0.txt",
        //             "/SuperCrawl/content-57d199f1ef4709fb509d0659.txt",
        //             "/SuperCrawl/content-57e4070aa267594824a15441.txt",
        //             "/SuperCrawl/INDEX.txt"
        //         ]
        //     };
        //     let retInsert = await dao['tickerCrawls'].insert(newdoc);
        //     console.log(retInsert)
        // } catch (x) {
        //     console.log(x);
        // }
        //
        //
        // try {
        //     console.log('>>> deleteById');
        //     let retDeleteById = await dao['tickerCrawls'].deleteById(ObjectID("5c06b7bf7d838c0653c38b70"))
        //     console.log(retDeleteById);
        // } catch (x) {
        //     console.log(x);
        // }
        //
        // try {
        //     let retInsert = await dao['tickerCrawls'].insert(newdoc);
        //
        //
        //     console.log('>>> deleteBySelector');
        //     let retDelete = await dao['tickerCrawls'].deleteBySelector(
        //         {
        //             zoneID: ObjectID('54e4f4442861e36744edafc1')
        //             ,
        //             type: "Top Line"
        //         });
        //     console.log(retDelete);
        // } catch (x) {
        //     console.log(x);
        // }
        //
        //
        // try {
        //     // test instance methods
        //     console.log('>>>');
        //     dao.tickerCrawls.MethodA();
        //     dao.tickerCrawls.MethodB();
        // } catch (x) {
        //     console.log(x);
        // }
        //
        // try {
        //     let tickerData = [];
        //     let stationID = '54dcd5d034bf1a66b582c2cc';
        //
        //     let closings = await dao.closingsClosures.query({stationID: '54dcd5d034bf1a66b582c2cc'});
        //
        //     closings.forEach(async aClosing => {
        //
        //         let account = await   dao.closingsAccounts.query({_id: ObjectID(aClosing.accountID)});
        //
        //         account.zones.forEach(zoneId => {
        //
        //             // DEFAULT TITLE: CLOSINGS
        //             // [ORG DISPLAY NAME]:      [STATUS]                  [PREPOSITION-if available]     [VALUE if available], [SECONDARY STATUSES-if available, separated by commas]
        //             // [closingsAccounts.name]: [closingsAccounts.status] [closingsClosures.preposition] [VALUE if available], [closingsClosures.secondaryStatus [], ..., ]
        //
        //             let content = `${account.name} : ${aClosing.status}} : ${aClosing.preposition} `
        //             if (aClosing.secondaryStatuses && aClosing.secondaryStatuses.length > 0) {
        //                 aClosing.secondaryStatuses.forEach(aStatus => {
        //                     content += ' ' + aStatus + ', '
        //                 })
        //             }
        //
        //
        //             tickerData.push({
        //
        //                 stationID: stationID,
        //                 zoneID: zoneId,
        //                 content: content,
        //                 dateModified: aClosing.dateModified,
        //
        //
        //                 name: account.name,
        //                 type: 'closing',
        //                 crawlType: 'Top Line',
        //                 status: aClosing.status,
        //                 control: 'Enabled',
        //                 events: {},
        //
        //                 index: 'crawl'
        //             });
        //         });
        //
        //     });
        // } catch (x) {
        //     console.log(x);
        // }
        //
        //
        // try {
        //     let account = await   dao.closingsAccounts.fetchAll();
        //     account[0].zones.forEach(zoneId => {
        //
        //         let aClosing = closings[0];
        //         let content = `${account[0].name} : ${aClosing.status} : ${aClosing.preposition} `
        //         let doc = {
        //
        //             stationID: stationID,
        //             zoneID: zoneId,
        //             content: content,
        //             dateModified: aClosing.dateModified,
        //
        //
        //             name: account.name,
        //             type: 'closing',
        //             crawlType: 'Top Line',
        //             status: aClosing.status,
        //             control: 'Enabled',
        //             events: {},
        //
        //             index: 'crawl'
        //         }
        //
        //         console.log(doc);
        //     });
        // } catch (x) {
        //     console.log(x);
        // }
        //
        // try {
        //     let ap = await dao.apFeeds.fetchAll();
        //     console.log(ap);
        // } catch (x) {
        //     console.log(x);
        // }
        //
        // // for ( closing of closings) {
        // //     let account = await dao.closingsClosures.que
        // //     console.log(account);
        // // }
        // // let details = await dao.closingsAccounts.fetchById('56290420a1aaeea75bb57b4c');
        // // console.log(details);

        process.exit(0)

    } catch (e) {
        console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
        console.log(e)
        console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
        process.exit(-1)
    }
}

test();