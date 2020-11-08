
let config = require("../../../config"),
    generateUUID = require("../../api/uuid/uuid_api.js")

module.exports.generateUUID = generateUUID;


var REST                = require('../../api/rest_factory');
var RestEndpoint        = REST.RestEndpoint;
var RestServiceFactory  = REST.RestServiceFactory;


/**
 * Service Generates Unique Id
 */
module.exports.service = new RestServiceFactory(
    "UUID",
        [
            new RestEndpoint('GET', '/uuid', function (req, res) {
                let ret = undefined;
                try {
                    var uuid = generateUUID();
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
            })
        ]
);

/**
 * Start UUID Service on port
 *
 * @param port
 */
module.exports.start = function(port){
    module.exports.service.start(port);
};

// let port = config.services.uuid.port;
// module.exports.start(port);
