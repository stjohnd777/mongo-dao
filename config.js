module.exports = {

    https: {
        key_file: ""
        ,
        crt_file: ""
    }
    ,
    mongo:
        {
            category : 'standalone'
            ,
            secured : 'false'
            ,
            user : ''
            ,
            password : ''
            ,
            hosts : [ { host : 'localhost', port :27017 }]
            ,
            databaseName : 'automa'
        }

    ,
    services : {
        uuid :{
            name: 'uuid',
            port : 8000,
            use_https : false,
            https: {
                key_file: "",
                crt_file: ""
            },
            app :undefined,
            clustered : false
        }
        ,
        dao :{
            name: 'dao',
            port : 9000,
            use_https : false,
            https: {
                key_file: "",
                crt_file: ""
            },
            app :undefined,
            clustered : false
        }
        ,
        crypto:{
            name: 'crypto',
            port : 10000,
            use_https : false,
            https: {
                key_file: "",
                crt_file: ""
            },
            app :undefined,
            clustered : false
        }
    }

    ,

    cryptojs : {
        secret : 'This is my secret'
    }

}