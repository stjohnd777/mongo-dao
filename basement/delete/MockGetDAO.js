let GetDAO = require('../RavenData/DAOMock')

async function test (){
    let DAO = await GetDAO ();
    let doc = await DAO['closingsAccounts'].fetchById('5bfc4441b5ab921a8bb82b3b');
    console.log(doc);
    doc = await DAO['closingsAccounts'].fetchById(ObjectID('5bfc4441b5ab921a8bb82b3b'));
    console.log(doc);

    let list = await DAO['closingsAccounts'].fetchAll();
    console.log(list);
}
test();