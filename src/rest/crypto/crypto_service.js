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

let port = 8989;

/**
 * Service Generates Unique Id
 */
module.exports.service = new RestServiceFactory(
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
                    cipher : hash
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
        new RestEndpoint('POST', '/dosestexthashto', function (req, res) {
            let ret = undefined;
            try {
                let text = req.body.text;
                let hash = req.body.hash;
                let isEqual = crypto_api.DoesTestHashTo(text,hash);
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


module.exports.start = function(port){
    module.exports.service.start(port);
};
