const router = require("express").Router();
const history = require("../controllers/gamesuitHistory");



router.get('/history', history.getHistory); 

//create
router.get('/history/add', history.getAddHistory);
router.post('/history/post', history.addHistory);

// update
router.get('/history/edit/:id', history.getEditHistory);
router.post('/history/edit', history.updateHistory);

// delete
router.get('/history/delete/:id', history.deleteHistory);

module.exports = router;