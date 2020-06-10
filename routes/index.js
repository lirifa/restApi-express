var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/shxx/list', function(req, res, next) {
  var datas = {
    data:[1,2,3,4]      
  }

  res.send(datas);
});

module.exports = router;
