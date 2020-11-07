let InitDao =  require('./InitDAO');

async function test() {

    try {

        //let DAO =
        await InitDao();

        let automa = await DAO['automa'].fetchAll()

        console.log(automa);

        process.exit(0)

    } catch (e) {
        console.log(e)
    }
}

test();