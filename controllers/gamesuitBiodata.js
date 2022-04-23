const req = require("express/lib/request");
const { Biodata } = require("../models");
const bcrypt = require('bcrypt');


const getBiodata = async (_, res) => {
    const usersBiodata = await Biodata.findAll();
    res.render('../views/gamesuit-biodata/user-biodata',{
        userBiodata: usersBiodata,
    });
};

const getAddBiodata = async(req, res) => {
    res.render('../views/gamesuit-biodata/add-biodata')
};

const addBiodata = async(req, res) => {
    const userBiodata = await Biodata.create({
        gameid: req.body.gameid,
        name: req.body.name,
        hobby: req.body.hobby,
    });

    res.redirect('/biodata');
};

const getEditBiodata = async(req, res) => {
    const usersBiodata = await Biodata.findByPk(req.params.id);
        res.render('gamesuit-biodata/edit-biodata',{
            userBiodata:usersBiodata
    })
    
};

const updateBiodata = async(req,res)=>{
    const userBiodata = await Biodata.update({
        gameid: req.body.gameid,
        name: req.body.name,
        hobby: req.body.hobby,
        },{
        where:{id:req.body.id}
    });
    res.redirect('/biodata');
};

const deleteBiodata = async(req,res)=>{
    const userBiodata = await GamesuitBiodata.destroy({
        where:{id:req.params.id}
    });
    res.redirect('/biodata') 
};

module.exports = {
    getBiodata,
    getAddBiodata,
    addBiodata,
    getEditBiodata,
    updateBiodata,
    deleteBiodata
}