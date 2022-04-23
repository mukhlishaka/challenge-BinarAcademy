const router =require("express").Router();
const user = require("../controllers/gamesuitUser");

// User
router.get('/user', user.getUser);
// create
router.get('/user/add', user.getAddUser);
router.post('/user/post', user.addUser);

// update
router.get('/user/edit/:id', user.getEditUser); 
router.post('/user/update', user.updateUser);

// delete
router.get('/user/delete/:id', user.deleteUser);



module.exports = router;
