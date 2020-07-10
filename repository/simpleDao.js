const content_repository = require('../simpleCache');

cache = content_repository.cache;

 function get(key){
    return cache.get( key );
}

 function set(key,value){
    return cache.set( key, value, 0 );
}

module.exports = { set, get }; 
