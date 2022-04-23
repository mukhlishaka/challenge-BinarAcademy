const router = require("express").Router();
const biodata = require("../controllers/gamesuitBiodata");


router.get('/biodata', biodata.getBiodata);

//create
router.get('/biodata/add', biodata.getAddBiodata);
router.post('/biodata/post', biodata.addBiodata);

// update
router.get('/biodata/edit/:id', biodata.getAddBiodata);
router.post('/biodata/edit', biodata.updateBiodata);

// delete
router.get('/biodata/delete/:id', biodata.deleteBiodata);

module.exports = router;