
/**
 * Models a REST service endpoint,
 *
 * @param method the HTTP method
 * @param path the path for example /foo
 * @param provider the function handling the request response
 * @constructor
 */
function RestEndpoint(method, path, provider){
    this.method = method;
    this.path = path;
    this.provider = provider;
}
module.exports.RestEndpoint = RestEndpoint;


/**
 *
 * @param name
 * @param endpoints
 * @param secure
 * @param secret
 * @constructor
 */
function RestServiceFactory(name, endpoints, middleWares = [], secure = false , secret =  '1234567890QWERTY', _app){

    let service = name;

    RestServiceFactory.prototype.exec = function exec (req,res,provider){
        provider(req,res);
    };

    let express = require('express');

    if ( _app) {
        var app = _app;
    }else {
        var app = express();

    }

    // Not sure of scope I need yet
    let https = undefined;
    let fs = undefined;
    let httpsOptions = undefined;

    if(secure) {
        fs = require('fs');
        https = require('https');

        httpsOptions = {
            key: fs.readFileSync( config.https.key_file),
            cert: fs.readFileSync( config.https.crt_file)
        };
    }
    // Set up the session
    // const cookieParser = require('cookie-parser');
    // app.use(cookieParser());
    // app.use(session({secret: secret, resave: false, saveUninitialized: false}));


    // middleware for post data
    app.use(function (req, res, next) {
        let data = '';
        req.setEncoding('utf8');

        req.on('data', function (chunk) {
            data += chunk;
        });

        req.on('end', function () {
            try {
                if (data) {
                    req.body = JSON.parse(data);
                }
            }catch (e){
                req.middleware_err = [];
                req.middleware_err.push(e);
            }
            next();
        });
    });


    // some generic middleware catch, for example use this for authentication
    // or permissions
    if ( middleWares.length > 0) {

        // TODO : step throught the array

        // app.use(function (req, res, next) {
        //     next();
        // });
    }

    // PING ENDPOINT
    app.get('/ping', function(req,res){
        let now = new Date();
        res.json( {
            success: true,
            payload: {
                service: name,
                message: "Service is running",
                server_time: now.toUTCString()
            }})});

    // manage the endpoints
    endpoints.forEach( endpoint =>  {

        let method   = String(endpoint.method);
        let path     = endpoint.path;
        let provider = endpoint.provider;

        //console.log(method +":" +path );
        switch(method.toUpperCase()) {
            case "GET":
                app.get(path, provider);
                break;
            case "POST":
                app.post(path, provider);
                break;
            case "PUT":
                app.put(path, provider);
                break;
            case "DEL":
            case "DELETE":
                app.delete(path, provider);
                break;
            default:
                throw new Error("RestServiceFactory: invalid ajax method " + method);
        }
    })

    if(secure) {

        this.start = function(port,callback) {
            let server = https.createServer(httpsOptions, app);
            server.listen( port, function() {
                console.log(server + " service is running securely on " + port);
                if(callback) {
                    callback();
                }
            });
        };

    } else {

        this.start = function (port,callback) {

            app.listen(port, function (err, res) {
                console.log(service + " service is running on " + port);
                if(callback) {
                    callback(err, res);
                }
            });
        };
    }

    this.stop = function(){
        console.log(service + " service is down on ");
        app.close();
    }

}
module.exports.RestServiceFactory = RestServiceFactory;








