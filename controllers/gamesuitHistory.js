const req = require("express/lib/request");
const { History } = require("../models");
const bcrypt = require('bcrypt');

const getHistory = async(_, res) => {
    const usersHistory = await History.findAll();
    res.render('../views/gamesuit-history/user-history',{
        userHistory: usersHistory,
    });
};

const getAddHistory = async(req,res)=>{
    res.render('../views/gamesuit-history/add-history')
};

const addHistory = async(req,res)=>{
    const userHistory = await History.create({
        gameid: req.body.gameid,
        score: req.body.score,
        playedAt: Date.now(),
    });
    res.redirect('/history');
};

const getEditHistory = async(req,res)=>{
    const usersHistory = await History.findByPk(req.params.id);
        res.render('gamesuit-history/edit-history',{
        userHistory: usersHistory
    })  
};

const updateHistory = async(req,res)=>{
    const userHistory = await History.update({
        gameid: req.body.gameid,
        score: req.body.score,
        playedAt: req.body.playedAt,
        },{
        where:{id:req.body.id}
    });

    res.redirect('/history');
};

const deleteHistory = async(req,res)=>{
    const userHistory = await History.destroy({
        where:{id:req.params.id}
    });
    res.redirect('/history') 
};


module.exports = {
    getHistory,
    getAddHistory,
    addHistory,
    getEditHistory,
    updateHistory,
    deleteHistory
}