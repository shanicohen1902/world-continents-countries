var express = require('express');
const respond = require('express-respond');
const request = require('request');
var router = express.Router();
const simple_dao = require('../repository/simpleDao');
router.use(respond);
var constants = require('../constants/constants');
var queries = require('../constants/queries');


router.get('/', function(req, res) {

  data = simple_dao.get( "continents" );
  if ( data  ){
      console.log("catch!!! cache");
      res.ok(data);
      return;
    }

  request(constants.COUNRIES_BASE_URL + queries.ALL_CONTINENTS, { json: true }, (err, response, body) => {

      if (body.errors) { 
          res.error(body.errors);
          return;
      }

      simple_dao.set( "continents", body, 0 );
      res.ok(body);
    });

});

router.get('/country/:code', function(req, res) {

  var continent = req.params.code;
  data = simple_dao.get( continent );
  if ( data  ){
      console.log("catch!!! cache");
      res.ok(data);
      return;
    }

    var newstring = queries.COUNTRIES_BY_CONTINENT.replace(/CODE_PLACEHOLDER/, continent);

  request(constants.COUNRIES_BASE_URL + newstring, { json: true }, (err, response, body) => {
    console.log(body);

      if (body.errors) { 
        res.error(body.errors);
        return;
    }
      simple_dao.set( continent , body, 0 );
      res.ok(body);
    });

});


module.exports = router;
