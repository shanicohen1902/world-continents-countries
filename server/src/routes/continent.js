const respond = require('express-respond');
const request = require('request');
const dao = require('../repository/simpleDao');
var express = require('express');
var router = express.Router();
var constants = require('../constants/constants');
var queries = require('../constants/queries');
router.use(respond);

const ALL_CONTINENTS_KEY = "continents";

// get all continents
router.get('/', function(req, res) {

  // trying to get from cache
  data = dao.get( ALL_CONTINENTS_KEY );
  if (data){
      console.log("catch!!! cache");
      return res.ok(data);
  }
  return getContinentsFromAPI(res);
});

// get countries by continent code 
router.get('/country/:code', function(req, res) {

  continent = req.params.code;
  if(!continent) res.badRequest(" no continent code");

  // trying to get from cache
  data = dao.get( continent );
  if (data){
      console.log("catch!!! cache");
      return res.ok(data);
  }
  return getCountriesFromAPI(res,continent);
});

function getContinentsFromAPI(res) {

  request(constants.COUNRIES_BASE_URL  + queries.ALL_CONTINENTS, { json: true }, (err, response, body) => {

    if (err) {
      console.log(JSON.stringify(err));
      return res.error(" There was a problem getting continent list from 3rd party");
    }

    if (body == null || body.errors) { 
      console.log(JSON.stringify(body));
      return res.error(" There was a problem getting continent list. ");
    }

    data = body.data.continents;
    // save response in cache 
    dao.set( ALL_CONTINENTS_KEY, data, 0 );
    res.ok(data);
  });
}


function getCountriesFromAPI(res,continent){

    var query = queries.COUNTRIES_BY_CONTINENT.replace(/CODE_PLACEHOLDER/, continent);

    request(constants.COUNRIES_BASE_URL + query, { json: true }, (err, response, body) => {
  
      if (err) {
        console.log(JSON.stringify(err));
        return res.error(" There was a problem getting country list from 3rd party");
      }
  
      if (body == null || body.errors || body.data.continent == null ) { 
        console.log(JSON.stringify(body));
        return res.badRequest(" There was a problem getting country list. Check the continent code again");
      }
  
      data = body.data.continent.countries;
      // save response in cache 
      dao.set( continent , data, 0 );
      res.ok(data);
    });
}

module.exports = router;
