const req = require("express/lib/request");
const { Game } = require("../models");
const bcrypt = require('bcrypt');


const getUser = async( _, res) => {
    const usersGame = await Game.findAll();
    res.render('../views/gamesuit/user-game',{
        userData: usersGame,
    });
};

const getAddUser = async (_, res) => {
    res.render('../views/gamesuit/add-user')
};

const addUser = async (req, res) => {
    const user = await Game.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
});
    res.redirect('/user')
};

const getEditUser = async (req, res) => {
    const usersGame = await Game.findByPk(req.params.id);
    res.render('gamesuit/edit-user', {
        userData: usersGame,
    });
};

const updateUser = async(req, res) => {
    const user = await Game.update({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    }, {
        where:{
            id:req.body.id
        }
    });
    res.redirect('/user')
};

const deleteUser = async(req,res)=>{
    const user = await Game.destroy({
        where:{
            id:req.params.id
        }
    });
    res.redirect('/user') 
};

module.exports = {
    getUser,
    getAddUser,
    addUser,
    getEditUser,
    updateUser,
    deleteUser
};