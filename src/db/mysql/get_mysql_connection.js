const mysql = require('mysql')

let GetMySqlDatabasePromise = (host, user, password,database) => {

    return new Promise((resolve, reject) => {

        try {
            const con = mysql.createConnection({
                host: host,
                user: user,
                password: password,
                database : database
            });

            con.connect(err => {
                if (err) {
                    console.error("Failed to Connect!");
                    reject(err)
                } else {
                    console.log("Connected!");
                    resolve(con);
                }
            });
        } catch(e){
            reject(e)
        }

    });
};

module.exports = GetMySqlDatabasePromise

async function main (){
    const conn = await GetMySqlDatabasePromise('localhost','root','1overman!', 'database_development')

    conn.query('select * from Accounts', function (err, result) {
        if (err) throw err;
        //console.log("Result: " + result);
        result.forEach( r=>{
            console.log(r);
        })
    });


    return conn

}

try {
    const conn = main();


    console.log(conn);
} catch(e){
    console.log(e);
}

