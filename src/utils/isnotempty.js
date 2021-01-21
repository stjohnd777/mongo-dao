
function IsNotNull(){
    let isNotEmpty = true;

    [...arguments].forEach( arg=>{

        if ( ! arg ){
            isNotEmpty = false;
        }
        if ( Array.isArray(arg) && arg.length ==0){
            isNotEmpty = false;
        }

        console.log(arg,' is not empty ' , isNotEmpty)
    })
    return isNotEmpty;
}

let ans = IsNotNull ('a', '',"", null, undefined,[],[1,2,3],{},{'k1':0,'k2':1});
console.log('IsNotEmpty:',ans)