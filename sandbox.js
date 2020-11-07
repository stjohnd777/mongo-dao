const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let main = async (iterations)=>{

    let counter = 0;

    async function ask () {
        return new Promise((resolve,reject) => {
            try {
                rl.question('What do you think of Node.js? ', (answer) => {
                    resolve(answer);
                });
            }catch(e){
                reject(e);
            }
        });
    }

    while ( counter < iterations) {
        let ans =  await ask();
        console.log(`Thank you for your valuable feedback: ${ans}`)
        counter ++
    }
    console.log(`Done with ${iterations} questons` )
    rl.close();
}


main(3);


