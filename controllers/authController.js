const { Game } = require('../models');
const passport = require('../lib/passport');
const bcrypt = require("bcrypt");

function format(user) {
    const { id, username } = user
    return {
        id,
        username,
        accessToken: user.generateToken()
    }
};

module.exports = {
    registerPage: (_, res) => {
        res.render('register');
    },

    register: async (req, res, next) => {
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.body.password, salt);
        await Game.create({
            username: req.body.username,
            email: req.body.email,
            password: hashPass,
        });
        res.redirect("/");
        
        // try {
        //     await Game.register({
        //         username: req.body.username,
        //         email: req.body.email,
        //         password: req.body.password,
        //     });
        //     res.redirect('/login');
        // } catch (err) {
        //     next(err);
        // }
    },

    loginPage: (_, res) => {
        res.render('login');
    },

    login: passport.authenticate('local', {
        successRedirect: '/user',
        failureRedirect: '/login',
        failureFlash: true
    }),

    apiLogin: async(req, res) => {
        try {
            const game = await Game.authenticate({
                username: req.body.username,
                password: req.body.password,
            });

            const { id, username,  password} = game;

            res.json({
                id,
                username: game.username,
                token: game.generateToken(),
            });
        } catch(err) {
            console.log(err);
        }
    },

    logout: (req, res) => {
        req.logout();
        res.redirect('/');
    },
};
