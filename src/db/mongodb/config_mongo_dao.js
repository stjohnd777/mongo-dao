
module.exports = {

     automa: {
         // automa dao has only the CRUD operations
     }

    , users: {
        // addition methods will be ducked onto the
        // user dao DAO.users from
        extension: require('../dao/extensions/user_ext')
    }
    , runs: {}
    , abstract_view : {
        // not collection abstract_view exists in the mongo database
        // but the DAO.abstract_view will have the functions defined
        // in moduel below ducked
        isAbstraction : true,
        extension : require('../dao/abstraction/abstration')
    }
}



