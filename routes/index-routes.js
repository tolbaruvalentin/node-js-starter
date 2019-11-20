const
    express = require('express'),
    router = express.Router(),
    firstPageController = require('../controllers/firstPageController');

router.get('/', firstPageController.firstPage);

module.exports = router;