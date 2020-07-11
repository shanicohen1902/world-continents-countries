const respond = require('express-respond');
const request = require('request');
const dao = require('../repository/simpleDao');
var express = require('express');
var router = express.Router();
var constants = require('../constants/constants');
var queries = require('../constants/queries');
router.use(respond);

// get all continents
router.get('/', function(req, res) {

  // trying to get from cache
  data = dao.get( "continents" );
  if ( data  ){
      console.log("catch!!! cache");
      return res.ok(data);
  }

  // get from 3rd party
  request(constants.COUNRIES_BASE_URL + queries.ALL_CONTINENTS, { json: true }, (err, response, body) => {

      if (body == null || body.errors || isEmpty(body.data.continents) ) { 
        return res.error(" There was a problem getting country list ");
      }

      data = body.data.continents;
      // save response in cache 
      dao.set( "continents", data, 0 );

      res.ok(data);
    });

});

// get countries by continent code 
router.get('/country/:code', function(req, res) {

  continent = req.params.code;
  if(! continent) res.error(" no continent code");

  // trying to get from cache
  data = dao.get( continent );
  if ( data  ){
      console.log("catch!!! cache");
      return res.ok(data);
  }

  // update query with continent name
  var newstring = queries.COUNTRIES_BY_CONTINENT.replace(/CODE_PLACEHOLDER/, continent);

  // get from 3rd party
  request(constants.COUNRIES_BASE_URL + newstring, { json: true }, (err, response, body) => {

    if (body == null || body.errors || isEmpty(body.data.continent)) { 
      return res.error(" There was a problem getting country list ");
    }

    data = body.data.continent.countries;
    // save response in cache 
    dao.set( continent , data, 0 );

    res.ok(data);
    });

});

function isEmpty(obj) {
  if (obj == null) return true;
  for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
          return false;
  }
  return JSON.stringify(obj) === JSON.stringify({});
}


module.exports = router;
