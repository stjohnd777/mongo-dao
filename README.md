# mongo-dao 
DAO for MongoDB 

The insperation for this pattern is many of the ORM types of frameworks that exist in other languages such as Java. Developers in a modern age should not be burdened with data base mechanics. In many case the 
CRUD operations are enough to facitiate most use cases.

* The repo is a DAO pattern for MongoDB
* CRUD Operations are dynamically generated
* A configuation obejct allows for exposing and hidding collection.
* Additional DAO methods can be dicked onto the DAO with extension.
* Virtual Collection can be defined
* Exposed CRUD operations can be exposed as REST services. 
* Index HTML Page for Brousing Data

General Usage is illistrated below. Before we begine suppose you have a mongo database HR with collections 
## [employee, manager, salery, bonus, ... ]

This DAO is dynamicaly generates from a configuration file confi_mongo_dao.js. The employee, mamanger and bonus
collections are exposed inn the DAO while salery is hidden. This explict expose/hide feature allow for data selective 
hidding. The performance DAO is abstract, that means there is not real collection performance. The DAO.performance has
ducked method from module require('./dao/abstraction/performance')

```javascript
// confi_mongo_dao.js.
module.exports = {

     employee: {
         // employee dao has only the CRUD operations
     }

    , manager: {
        // additional methods will be ducked onto the
        // user dao DAO.manager from
        extension: require('./dao/extensions/manager_ext')
    }
    , bonus: {
    }
    , performance : {
        // not collection abstract_view exists in the mongo database
        // but the DAO.performance will have the functions defined
        // in moduel below ducked
        isAbstraction : true,
        extension : require('./dao/abstraction/performance')
    }
}
```
#### The CRUD methods are generated dynamically.  CRUD operation provided are:

* FindAll (callback = undefined)
* FindById(id,callback = undefined)
* Insert(doc, callback) 
* Query(querySelector, limit = maxDocs, sortCriterion = {_id: -1}, callback=undefined)
* Update (selector, newvalues, options = {upsert : false},callback=undefined)
* UpdateOne ( selector, newdocument,callback=undefined)
* DeleteById (oid)
* Delete ( selector, callback=undefined)

## CRUD Operations
#### One may use the modern Promise handling or callback depending on preference

#### Example FindAll
```javascript
  let employees = await DAO['employee'].FindAll();
```  
or 
```javascript
  let employees = DAO['employee'].FindAll((err,docs)=>{
      // handle docs here
      }
    );
```    
#### Example FindByID
This method use the mongo primary key _id. One may use the string or ObjectID
```javascript
  let oid = ObjectId("5fa6e26a267c9c124cc52c21")
  let employee = await DAO['employee'].FindById(oid);
  // also can use string
  employe = await DAO['employee'].FindById("5fa6e26a267c9c124cc52c21");
```  
and callback is also possible 
```javascript
  let employee = DAO['employee'].FindById ( oid, (err,doc)=>{
      // handle doc here
      }
    );
```
#### Example Insert
```javascript
  let employee = { fname : 'Dan' , lname = 'StJohn', .... };
  let employee = await DAO['employee'].Insert(employee);
```  
and callback is also possible 
#### Example Query
```javascript
  let selector = { level : 4 }
  let employees = await DAO['employee'].Query( selector);
```  
#### Example Update/UpdateOne
```javascript
  employee.level = 5;
  let selector = { _id : oid }
  let employees = await DAO['employee'].UpdateOne( selector, employee);
  
  #### Example Update
```javascript
  employee.level = 5;
  let selector = { _id : oid }
  let employees = await DAO['employee'].Delete( );
```

 ## REST Services  
 
CRYPTO service is running on 8000

* POST http://localhost:9000/hash
```javascript
     Accept: */*
     Cache-Control: no-cache

     { "text" : "HashMe" , "hash" : "AES" }
```

* POST http://localhost:9000/doestexthashto
```javascript
     Accept: */*
     Cache-Control: no-cache

     { "text" : "HashMe" , "hash" : "AES" }
```

* POST http://localhost:9000/encrypt
```javascript
     Accept: */*
     Cache-Control: no-cache

     { "text" : "Test Me Please" , "algo" : "AES" }
     
* POST http://localhost:9000/decrypt
```javascript
     Accept: */*
     Cache-Control: no-cache

     { "cipher" : "U2FsdGVkX1/DqNkzMTGDNqC2PvkB1ITocFWIBuGCyfY=" , "algo" : "AES" }
```

```
*POST http://localhost:9000/decrypt
```javascript
     Accept: */*
     Cache-Control: no-cache

     { "cipher" : "U2FsdGVkX1/DqNkzMTGDNqC2PvkB1ITocFWIBuGCyfY=" , "algo" : "AES" }
```
UUID service is running on 10000
* http://localhost:8000/uuid
```javascript
     {
     success: true,
     uuid: "7101b79e-0873-452c-b28b-761b02ec654f"
     }
```
DAO Services service is running on 9000
* GET     http://localhost:9000/dao/:collectionName
* GET     http://localhost:9000/dao/:collectionName/:id
* GET     http://localhost:9000/dao/query/:collectionName/*
* PUT     http://localhost:9000/dao/:collectionName/*
* POST    http://localhost:9000/dao/:collectionName/ 
* DELETE  http://localhost:9000/dao/delete/:collectionName/:id'
