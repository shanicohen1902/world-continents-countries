var express = require('express');
var router = express.Router();

router.get('/:continent', function(req, res, next) {
  var continent = req.params.continent;
  res.send(continent);
});



module.exports = router;
