let REST                = require('../../api/rest_factory');
let RestEndpoint        = REST.RestEndpoint;
let RestServiceFactory  = REST.RestServiceFactory;

let aws = require('aws-sdk');
let s3 = new aws.S3();



let S3API = require('../../api/s3/s3_api');

let port = 9000;
module.exports.service = new RestServiceFactory("s3",
        [
            new RestEndpoint('GET', '/service/s3/list/buckets', function (req, res) {
                let ret = undefined;
                try {

                    S3API.ListBuckets((err,data) => {
                        let ret = {};
                        if ( err){
                            ret.success = false;
                            ret.error = err;
                        }else {
                            ret.payload = data;
                        }
                        res.json(ret );
                    });

                } catch(e){
                    ret =  {
                        success : false,
                        error : e
                    };
                    res.json(ret );
                }

            })
            ,
            new RestEndpoint('GET', '/service/s3/list/prefixes/:bucket', function (req, res) {
                let ret = undefined;
                try {
                    let bucket = req.params.bucket;

                    S3API.ListPrefix(bucket, (err, res) => {
                        let ret = {};
                        if ( err){
                            ret.success = false;
                            ret.error = err;
                        }else {
                            ret.payload = data;
                        }
                        res.json(ret );
                    });

                } catch(e){
                    ret =  {
                        success : false,
                        error : e
                    };
                    res.json(ret);
                }

            })
            ,
            new RestEndpoint('GET', '/service/s3/list/object/:bucket/:prefix', function (req, res) {
                let ret = undefined;
                try {

                    let bucket = req.params.bucket;
                    let prefix = req.params.key;


                    prefix = prefix + '/';
                    S3API.ListObjectInBucket(bucket, prefix, (err, res) => {
                        let ret = {};
                        if ( err){
                            ret.success = false;
                            ret.error = err;
                        }else {
                            ret.payload = data;
                        }
                        res.json(ret );
                    });


                } catch(e){
                    ret =  {
                        success : false,
                        error : e
                    };
                    res.json(ret);
                }

            })

            // TODO add get object

        ]
);


module.exports.start = function(port){
    console.log("S3 Delegate service started on " + port);
    module.exports.service.start(port);
};
module.exports.start(port);

