module.exports = {

    https: {
        key_file: ""
        ,
        crt_file: ""
    }
    ,
    mongo: [
        {
            category : 'standalone'
            ,
            secured : 'false'
            ,
            user : ''
            ,
            password : ''
            ,
            hosts : ['localhost']
            ,
            ports : [ 27017 ]
            ,
            databaseName : 'automa'
        }
    ]
    ,
    services : {
        uuid :{
            name: 'uuid',
            host : 'localhost',
            port : 8989,
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
            host : 'localhost',
            port : 8990,
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
            host : 'localhost',
            port : 8991,
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