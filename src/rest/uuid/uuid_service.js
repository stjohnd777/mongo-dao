const config = require("../../../config"),
    generateUUID = require("../../api/uuid/uuid_api.js")

module.exports.generateUUID = generateUUID;

const REST                = require('../../api/rest_factory')
const RestServiceFactory  = REST.RestServiceFactory


/**
 * Service Generates Unique Id
 * Start UUID Service on port
 *
 * @param port
 */
module.exports.start = function(port,isHttps=false){

    const serviceName =  "UUID"

    const aProvider =  (req, res) =>{
        let ret;
        try {
            const uuid = generateUUID();
            ret = {
                success : true,
                uuid : uuid
            };
        } catch(e){
            ret =  {
                success : false,
                error : e
            };
        }
        res.json(ret);
    }


    const expressApp = undefined


    const service = new RestServiceFactory(
        serviceName
        ,[ {
            method:'GET',
            path:"/uuid",
            provider:aProvider
        } ]
        ,[] // middlewares
        ,expressApp // express app
        ,isHttps
        ,config.https.secret
        ,config.https.key_file
        , config.https.crt_file,
        isHttps
    );

   service.start(port);
};

module.exports.start(config.services.uuid.port,false);
