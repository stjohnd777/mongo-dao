let REST = require('../../api/rest_factory'),
    RestEndpoint = REST.RestEndpoint,
    RestServiceFactory = REST.RestServiceFactory,
    ObjectID = require('mongodb').ObjectID;


let endpointList = new RestEndpoint('GET', '/dao', async (req, res) => {
    let cols = await DAO.listAllCollections();

    let html = '<html>';
    html += '<ul>';
    cols.forEach( c =>{
        html += `<li><a href=/dao/${c.name}>${c.name}</a></li>`
    });
    html += '</ul>';
    html += '</html>';
    res.send(html);
});

let endpointFetchAll = new RestEndpoint('GET', '/dao/:collectionName/', async (req, res) => {
    let ret = await  DAO[req.params.collectionName].fetchAll(req.params.collectionName);
    res.json(ret);
});

let endpointFetchById = new RestEndpoint('GET', '/dao/:collectionName/:id', async (req, res) => {
    let ret = await  DAO[req.params.collectionName].fetchById(req.params.id);
    res.json(ret);
});

let endpointQuery = new RestEndpoint('GET', '/dao/query/:collectionName/*', async (req, res) => {

    let collectionName = req.params.collectionName;
    let url = req.url;
    let params = req.params[0];
    let qp = req.queryParams;

    try {
        let criterion = params.split('/');

        if (criterion.length % 2 !== 0) {
            throw Error("Need Even number parameters")
        }

        let theCriterion = { };
        for (let index = 0; index < criterion.length; index = index + 2) {
            let fieldName = criterion[index];
            let fieldValue =  criterion[index+1];
            fieldValue = fieldName.endsWith(('ID')) ? ObjectID(fieldValue) : fieldValue;
            fieldValue = fieldName.endsWith(('_id')) ? ObjectID(fieldValue) : fieldValue;
            theCriterion[ fieldName ]  = fieldValue;
        }

        let docs = await DAO[collectionName].query(theCriterion);

        let ret = {
            status: '200',
            url: url,
            collectionName: collectionName,
            criterion: criterion,
            docs: docs
        };

        res.json(ret);

    }catch (ex) {
        let ret = {
            status: '301',
            url: url,
            message : 'Bad Request',
            ex : ex
        };
        res.json(ret);
    }
});

let update = new RestEndpoint('PUT', '/dao/:collectionName/', async (req, res) => {
    let ret = 'not implemented';
    res.json(ret);
});

let create = new RestEndpoint('POST', '/dao/:collectionName/', async (req, res) => {
    let ret = await  DAO[req.params.collectionName].insert(req.body);
    res.json(ret);
});

let endpointDeleteById = new RestEndpoint('DELETE', '/delete/:collectionName/:id', async (req, res) => {
    let ret = await  DAO[req.params.collectionName].deleteById(req.params.id);
    res.json(ret);
});

let endpoints = [endpointList,endpointFetchById, endpointFetchAll, endpointQuery, create, endpointDeleteById];

let services = new RestServiceFactory('DAO Services', endpoints, false,undefined, undefined);

module.exports = services;