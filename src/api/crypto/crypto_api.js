const bcrypt = require('bcrypt');
const CryptoJS = require("crypto-js");
const config = require ('../../../config');

module.exports =  {

    Hash : function (text){
        const saltRounds = 10;
        return new Promise((resolve, reject) => {
            bcrypt.hash(text, saltRounds, function(error, hash) {
                if (error) return reject(error);
                resolve(hash);
            });
        })
    }
    ,
    DoesTestHashTo: async function (hash, text){

        let h = await module.exports.Hash(text);
        return hash == h;

        // return new Promise((resolve, reject) => {
        //     bcrypt.compare(text, hash)
        //         .then(res => {
        //            resolve(res);
        //         })
        //         .catch(error => {
        //             reject(error)
        //         })
        // })
    }
    ,

    Base64Encode : function (text){

    }
    ,
    Base64Encode : function  (decode){

    }
    ,
    Encrypt : function (text, algo='AES', secret = config.cryptojs.secret){

        switch (algo) {
            case 'AES':
                var ciphertext = CryptoJS.AES.encrypt(text, secret).toString();//CryptoJS.enc.Utf8);
                break;
            case 'DES':
                var ciphertext = CryptoJS.DES.encrypt(text, secret).toString();
                break;
            case 'TripleDES':
                var ciphertext = CryptoJS.TripleDES.encrypt(text, secret).toString();
                break;
            case 'Rabbit':
                var ciphertext = CryptoJS.Rabbit.encrypt(text, secret).toString();
                break;
            case 'RC4':
                var ciphertext = CryptoJS.RC4.encrypt(text, secret).toString();
                break;
            default:
                var ciphertext = CryptoJS.AES.encrypt(text, secret).toString();//CryptoJS.enc.Utf8);
                break;
        }

        return ciphertext;
    }
    ,
    Decrypt:  function (cipher, algo='AES',secret = config.cryptojs.secret) {
        switch (algo) {
            case 'AES':
                var ciphertext =  CryptoJS.AES.decrypt(cipher, secret).toString(CryptoJS.enc.Utf8);
                break;
            case 'DES':
                var ciphertext =  CryptoJS.DES.decrypt(cipher, secret).toString(CryptoJS.enc.Utf8);
                break;
            case 'TripleDES':
                var ciphertext =  CryptoJS.TripleDES.decrypt(cipher, secret).toString(CryptoJS.enc.Utf8);
                break;
            case 'Rabbit':
                var ciphertext =  CryptoJS.Rabbit.decrypt(cipher, secret).toString(CryptoJS.enc.Utf8);
                break;
            case 'RC4':
                var ciphertext =  CryptoJS.RC4.decrypt(cipher, secret).toString(CryptoJS.enc.Utf8);
                break;
        }

        return ciphertext;
    }

}

// let api = module.exports;
//
// let m = "Test is not working as designed or is it?"
// console.log(m);
// let cipher = api.Encrypt(m);
// console.log(cipher);
// let msg = api.Decrypt(cipher);
// console.log(msg);

