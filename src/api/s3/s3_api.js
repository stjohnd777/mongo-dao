let aws = require('aws-sdk');
// let async = require('async');
let s3 = new aws.S3();


/**
 * S3 API facade
 *
 * <ul>
 *     <li>ListBuckets</li>
 *     <li>ListObjectInBucket</li>
 *     <li>ListPrefix</li>
 *     <li>GetObject</li>
 *     <li>GetObjectToFile</li>
 * </ul>
 *
 * Authentication when running outside the AWS ecosystem is facilitated through the .aws/credentials file
 *
 *  [default]
 *  aws_access_key_id=AKIAJCRV2XLUYLOZUX4Q
 *  aws_secret_access_key =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
 *
 * @type {{s3: S3, ListBuckets: (function(*=)), ListObjectInBucket: (function(*, *=)), GetObject: (function(*=, *=, *=)), GetObjectWriteFile: (function(*=, *=, *=))}}
 */
let S3_api = {
    /**
     *  aws-sdk api reference
     */
    s3: s3
    ,
    /**
     * List the buckets,
     *
     * @param cb    function (err,data)
     * data = [{Name": "aesd.cms.dev","CreationDate": "2014-07-14T21:05:21.000Z"}, ...]
     *
     */
    ListBuckets: function (cb) {

        s3.listBuckets(function (err, data) {

            // data = [{
            //     "Name": "aesd.cms.dev",
            //     "CreationDate": "2014-07-14T21:05:21.000Z"
            // }, ...]

            if (cb) {
                cb(err, data);
            } else {
                console.log(err);
                console.log(data);
            }
        });
    }
    ,

    /**
     * list the object in the bucket
     * @param bucket  buket name
     * @param cb   function (err,data)
     * @constructor
     */
    ListObjectInBucket: (bucket, prefix, cb) => {

        let params = {
            Bucket: bucket,
            Delimiter: '/',
            MaxKeys: 10000
        };

        if (prefix) {
            params.Prefix = prefix;
        }
        s3.listObjects(params, function (err, data) {
            if (cb) {
                cb(err, data);
            }
        });
    }
    ,

    /**
     * Returns to prefixes for the bucket
     * @param bucket
     * @param cb  function (err,data) data = [{"Prefix": "20180220/"}, ...]
     */
    ListPrefix: (bucket, cb) => {
        S3_api.ListObjectInBucket(bucket, undefined, (err, res) => {

            // data = [{"Prefix": "20180220/"}, ...]
            cb(err, res.CommonPrefixes);
        });
    }
    ,
    /**
     * Get a object from the bucket with in memory buffer
     * @param bucket
     * @param key
     * @param cb callback function ( err, data)
     *    {
     *     "IsTruncated": false,
     *     "Marker": "",
     *     "Contents": [
     *     {
     *         "Key": "20180223/20180223_000008.tar.gz",
     *         "LastModified": "2018-02-23T00:00:53.000Z",
     *         "ETag": "\"626b667b44ad3a86df321505f8cb435d-9\"",
     *         "Size": 138703132,
     *         "StorageClass": "STANDARD",
     *         "Owner": {
     *             "DisplayName": "DLswdevopsDev",
     *             "ID": "0647aaf0f5a5fa05e579166b9f93a91b51e60a3a2f38892b8694edda6eafb140"
     *         }
     *     }, ....
     *
     *
     * ],
     *     "Name": "eos.raven.db-backups-dev",
     *     "Prefix": "20180223/",
     *     "Delimiter": "/",
     *     "MaxKeys": 10000,
     *     "CommonPrefixes": []
     * }
     * @constructor
     */
    GetObjectInBuffer: (bucket, key, cb) => {
        console.log("> Get Object>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        let paramsGetObject = {
            Bucket: bucket,
            Key: key
        };
        s3.getObject(paramsGetObject, function (err, data) {
            if (cb) {
                console.log(err);
                console.log(data);
                cb(err, data.Body || undefined);
            } else {
                console.log(err);
                console.log(data);
            }
        });
    }
    ,

    /**
     * Get  object with key in the bucket and write to file
     * through  streaming
     *
     * @param bucket the bucket name
     * @param key    the object key
     * @param path   file full path
     * @constructor
     */
    GetObjectWriteToFile: (bucket, key,path, cb) => {

        let paramsGetObject = {
            Bucket: bucket,
            Key: key
        };

        /// take path os temp dir
        let file = require('fs').createWriteStream(path);


        s3.getObject(paramsGetObject).on(
            'httpData',
            function (chunk) {
                //console.log(chunk);
                // fs.appendFile(file,chunk, 'utf8', (err) => { console.log('The "data to append" was appended to file!');});
                file.write(chunk);
                console.log (file.bytesWritten);
            }).on('httpDone', function () {
                console.log (writeStream.bytesWritten);
                file.end();
                file.close();

                console.log("Done!");

                if (cb) {
                    cb(bucket, key, path)
                } else {
                    console.log('done');
                }
        }).send();
    }
    ,

    GetObjectStream: (bucket, key, res ,cb) => {

        let paramsGetObject = {
            Bucket: bucket,
            Key: key
        };

        /// take path os temp dir
        //let file = require('fs').createWriteStream(path);


        s3.getObject(paramsGetObject).on(
            'httpData',
            function (chunk) {

                res.write(chunk);

            }).on('httpDone', function () {

                    if (cb) {
                        cb(undefined, {bucket, key,res })
                    } else {
                        console.log('done');
                    }
        }).send();
    }
};


S3_api.ListObjectInBucket('eos.raven.db-backups-dev/20180220', (err, res) => {

    let content = res.Contents;

    let map = {};

    content.forEach((o) => {

        let key = o.Key;
        let size = o.Size;
        let lastModified = o.LastModified;
        let split = key.split("/");

        let aDay = split[0];
        let aBackup = split[1];

        var backupsOnThisDay = map[aDay];
        if (!backupsOnThisDay) {
            backupsOnThisDay = [];
            map [aDay] = backupsOnThisDay;
        }
        backupsOnThisDay.push(aBackup);
    });

    console.log(map);

});


let backups = {};
function getLast30Days() {

    function formatDate(date) {
        let yyyy = date.getFullYear();
        let mm = date.getMonth() + 1;
        if (mm < 10) {
            mm = '0' + mm;
        }
        let dd = date.getDate();
        if (dd < 10) {
            dd = '0' + dd;
        }
        let ret = yyyy + mm + dd;
        return ret;
    }

    let dates = [];
    for (let i = 0; i < 30; i++) {
        let d = new Date(new Date().setDate(new Date().getDate() - i));
        dates.push(formatDate(d));
    }
    return dates;
}
backups.getLast30Days;


function listBackDays(callback) {
    S3_api.ListPrefix('eos.raven.db-backups-dev', (err, res) => {
        if (callback) {
            callback(err, res);
        } else {
            console.log(err);
            console.log(res);
        }
    });
}
backups.listBackDays;

function getBackupObjectForDay(yyyymmdd, callback) {

    yyyymmdd = yyyymmdd + '/';
    S3_api.ListObjectInBucket('eos.raven.db-backups-dev', yyyymmdd, (err, res) => {
        if (callback) {
            callback(res);
        } else {
            console.log(err);
            console.log(res);
        }
    });
}
backups.getBackupObjectForDay;


function getBackupsMap(callback) {
    let map = {};

    async.waterfall
    (
        [
            // get the prefixes
            (done) => {
                S3_api.ListPrefix('eos.raven.db-backups-dev', (err, prefixes) => {
                    if (!err) {
                        console.log(prefixes);
                        done(null, prefixes)
                    } else {
                        done(err);
                    }
                });

            }
            ,

            // get object in each prefix
            (prefixes, done) => {

                // array function, each function get object with a particular prefix
                let calls = prefixes.map((aPrefix) => {

                    return (callback) => {

                        // get object under a particular prefix
                        S3_api.ListObjectInBucket('eos.raven.db-backups-dev', aPrefix.Prefix, (err, res) => {

                            console.log('eos.raven.db-backups-dev' + ':' + aPrefix.Prefix);
                            if (!err) {
                                res.Contents.forEach((object) => {

                                    let key = object.Key;
                                    let size = object.Size;
                                    let lastModified = object.LastModified;
                                    let split = key.split("/");

                                    let aDay = split[0];
                                    let aBackup = split[1];

                                    var backupsOnThisDay = map[aDay];
                                    if (!backupsOnThisDay) {
                                        backupsOnThisDay = [];
                                        map [aDay] = backupsOnThisDay;
                                    }
                                    backupsOnThisDay.push(aBackup);

                                });
                            }
                            callback(err, res);
                        });
                    };

                });

                async.series(calls, (err, res) => {
                    done(err, map)
                });
            }
        ]
        ,

        // completion handler
        (err, res) => {
            console.log(res);
            if (callback) {
                callback(err, res);
            }
        }
    );

}
backups.getBackupsMap;




function WriteBackupToFile(bucket, key, path, callback) {

    S3_api.GetObjectWriteToFile(bucket, key, path, (err, data) => {
        const fs = require('fs');
        fs.writeSync(path, data);
        if (callback) {
            callback(null, path);
        } else {
            console.log("done > object writen ot file " + path);
        }
    });
}
backups.WriteBackupToFile;

function StreamBackupToFile(bucket, key, path, callback) {
    S3_api.GetObjectWriteToFile(bucket, key, path,callback);
}
backups.StreamBackupToFile =StreamBackupToFile;

S3_api.backups = backups;

module.exports = S3_api;

