const ObjectID = require('mongodb').ObjectID;

module.exports = {

    users: {}
    ,
    automa: {}
    ,

    runs:
        {}
    ,
    standard:
        {}
    ,
    calendarLists:
        {}
    ,
    abstractView : {
        isAbstraction : true,
        extension : require('./dao/abstraction/abstration')
    }
    ,
    example:
        {
            extension: require('./dao/extensions/exampleext')
        }

}



