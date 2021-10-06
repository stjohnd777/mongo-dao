/**
 * Generate a UUID
 *
 * @returns {string}
 */

let crypto_api = require("../../api/crypto/crypto_api.js")
let config = require('../../../config')

let REST                = require('../../api/rest_factory');
let RestEndpoint        = REST.RestEndpoint;
let RestServiceFactory  = REST.RestServiceFactory;



/**
 * Service Generates Unique Id
 */
// const service = new RestServiceFactory(
//     "CRYPTO",
//     [
//         new RestEndpoint('POST', '/hash', async function (req, res) {
//             let ret = undefined;
//             try {
//                 let text = req.body.text;
//                 let algo = req.body.algo;
//                 let hash = await crypto_api.Hash(text)
//                 ret = {
//                     success : true,
//                     cipher : hash
//                 };
//             } catch(e){
//                 ret =  {
//                     success : false,
//                     error : e
//                 };
//             }
//             res.json(ret);
//         })
//         ,
//         new RestEndpoint('POST', '/dosestexthashto', function (req, res) {
//             let ret = undefined;
//             try {
//                 let text = req.body.text;
//                 let hash = req.body.hash;
//                 let isEqual = crypto_api.DoesTestHashTo(text,hash);
//                 ret = {
//                     success : true,
//                     isEqual : isEqual
//                 };
//             } catch(e){
//                 ret =  {
//                     success : false,
//                     error : e
//                 };
//             }
//             res.json(ret);
//         })
//         ,
//         new RestEndpoint('POST', '/encrypt', function (req, res) {
//             let ret = undefined;
//             try {
//                 let text = req.body.text;
//                 let algo = req.body.algo || 'AES';
//                 let cipher = crypto_api.Encrypt(text,algo)
//                 ret = {
//                     success : true,
//                     cipher : cipher
//                 };
//             } catch(e){
//                 ret =  {
//                     success : false,
//                     error : e
//                 };
//             }
//             res.json(ret);
//         })
//         ,
//         new RestEndpoint('POST', '/decrypt', async function (req, res) {
//             let ret = undefined;
//             try {
//                 let cipher = req.body.cipher;
//                 let algo = req.body.algo || 'AES';
//                 let message = await crypto_api.Decrypt(cipher,algo);
//                 //let message = bytes.toString(CryptoJS.enc.Utf8);
//                 ret = {
//                     success : true,
//                     message : message
//                 };
//             } catch(e){
//                 ret =  {
//                     success : false,
//                     error : e
//                 };
//             }
//             res.json(ret);
//         })
//     ]
// );


module.exports.start = function(port,isHttps){

    const epGetHash = {
        method : 'POST',
        path : '/hash',
        provider : async  (req, res) => {
            let ret = undefined;
            try {
                let text = req.body.text;
                let algo = req.body.algo;
                let hash = await crypto_api.Hash(text)
                ret = {
                    success: true,
                    cipher: hash
                };
            } catch (e) {
                ret = {
                    success: false,
                    error: e
                };
            }
            res.json(ret);
        }
    }

    const epContentIsHash = {
        method: 'POST',
        path: '/dosestexthashto',
        provider: (req, res) => {
            let ret = undefined;
            try {
                let text = req.body.text;
                let hash = req.body.hash;
                let isEqual = crypto_api.DoesTestHashTo(text, hash);
                ret = {
                    success: true,
                    isEqual: isEqual
                };
            } catch (e) {
                ret = {
                    success: false,
                    error: e
                };
            }
            res.json(ret);
        }
    }

    const service = new RestServiceFactory(
        "CRYPTO",
        [
            new RestEndpoint('POST', '/hash', async function (req, res) {
                let ret = undefined;
                try {
                    let text = req.body.text;
                    let algo = req.body.algo;
                    let hash = await crypto_api.Hash(text)
                    ret = {
                        success : true,
                        hash : hash
                    };
                } catch(e){
                    ret =  {
                        success : false,
                        error : e
                    };
                }
                res.json(ret);
            })
            ,
            new RestEndpoint('POST', '/dosestexthashto', async (req, res) =>{
                let ret = undefined;
                try {
                    let text = req.body.text;
                    let algo = req.body.algo;
                    let hash = req.body.hash;
                    let isEqual = await crypto_api.DoesTestHashTo(hash, text);
                    ret = {
                        success : true,
                        isEqual : isEqual
                    };
                } catch(e){
                    ret =  {
                        success : false,
                        error : e
                    };
                }
                res.json(ret);
            })
            ,
            new RestEndpoint('POST', '/encrypt', function (req, res) {
                let ret = undefined;
                try {
                    let text = req.body.text;
                    let algo = req.body.algo || 'AES';
                    let cipher = crypto_api.Encrypt(text,algo)
                    ret = {
                        success : true,
                        cipher : cipher
                    };
                } catch(e){
                    ret =  {
                        success : false,
                        error : e
                    };
                }
                res.json(ret);
            })
            ,
            new RestEndpoint('POST', '/decrypt', async function (req, res) {
                let ret = undefined;
                try {
                    let cipher = req.body.cipher;
                    let algo = req.body.algo || 'AES';
                    let message = await crypto_api.Decrypt(cipher,algo);
                    //let message = bytes.toString(CryptoJS.enc.Utf8);
                    ret = {
                        success : true,
                        message : message
                    };
                } catch(e){
                    ret =  {
                        success : false,
                        error : e
                    };
                }
                res.json(ret);
            })
        ]
    );

    service.start(port,isHttps);
};


let port = 8989;
module.exports.start(8989)