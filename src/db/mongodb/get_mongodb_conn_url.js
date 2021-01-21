/**
 * An adaptive connection url function.
 *
 * Consider the builder pattern
 * in the future.
 *
 * @param opts {
 *   host : [<string>],
 *   databaseName : <string>,
 *   replicaSetName : <string>,
 *   user : <string>,
 *   pass : <string>
 *
 * }
 *
 *
 *
 * @returns {string}
 * @constructor
 */
function Get_mongodb_conn_url (opts ){

    let hosts = opts.hosts,
        databaseName = opts.databaseName,
        replicaSetName = opts.replicaSetName,
        user = opts.user,
        pass = opts.pass;

    let hostList = '' ;
    hosts.forEach( host =>{
        hostList +=  host.host + ':' + host.port + ','
    });
    hostList = hostList.substring(0,hostList.length -1);

    let url = 'mongodb://';

    if  (user) {
        url += `${user}:${pass}@`;
    }

    url += hostList;

    if (databaseName) {
        url += `/${databaseName}`
    }

    if ( replicaSetName) {
        url += `?replicaSet=${replicaSetName}&w=majority&ssl=true`
    }
    return url;
}
module.exports = Get_mongodb_conn_url;
