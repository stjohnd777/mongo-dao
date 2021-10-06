module.exports = {

    https: {
        key_file: "/Users/overman/dev/github/mongo-dao/ssl/server.key"
        , crt_file: "/Users/overman/dev/github/mongo-dao/ssl/server.cert"
        , secret: 'BETTERTORULEINHELL'
    }
    ,
    mongo:
        {
            category: 'standalone'
            ,
            secured: 'false'
            ,
            user: ''
            ,
            password: ''
            ,
            hosts: [{host: 'localhost', port: 27017}]
            ,
            databaseName: 'automa'
        }

    ,
    services: {

        uuid: {
            name: 'uuid',
            port: 8989,
            use_https: false,
            https: {
                key_file: "",
                crt_file: ""
            },
            app: undefined,
            clustered: false
        }
        ,
        crypto: {
            name: 'crypto',
            port: 8090,
            use_https: false,
            https: {
                key_file: "",
                crt_file: ""
            },
            app: undefined,
            clustered: false
        },
        dao: {
            name: 'dao',
            port: 8091,
            use_https: false,
            https: {
                key_file: "",
                crt_file: ""
            },
            app: undefined,
            clustered: false
        }

    }

}