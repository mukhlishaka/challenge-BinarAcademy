const express = require("express");
const res = require("express/lib/response");
const app = express();
const port = 3000;
let isLogin= false;

const session = require('express-session');
const flash = require('express-flash');
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret: 'rahasia banget',
    resave: false,
    saveUninitialized: false
}));

// Local Strategy
const passport = require("./lib/passport");
app.use(passport.initialize());
app.use(passport.session());

// jwt
const jwtPassport = require("./lib/jwtPassport")
app.use(jwtPassport.initialize());

app.use(flash());

app.set("view engine", "ejs");

const restrict = require("./middlewares/restrict");
const apiRestrict = require("./middlewares/apiRestrict");

const game = require("./routes/gamesuit");
const history = require("./routes/gamesuitHistory");
const biodata = require("./routes/gamesuitBiodata");
const auth = require("./routes/auth");

app.use("/user", restrict, game);
app.use("/history", restrict, history);
app.use("/biodata", restrict, biodata);
app.use(auth);

app.use(express.static("public"));

// app.use((req, res, next) => {
//     if (req.url === '/gamesuit' && !isLogin) {
//         res.redirect('/login');
//     }
//     next();
// })

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/gamesuit", (req, res) => {
    res.render("gamesuit");
});

app.get("/login", (req, res) => {
    res.render("login", {
        error: '',
    });
});

app.get("/register", (req, res) => {
    res.render("register", {
        error: '',
    });
});

// API
// app.post ('/login/auth',(req,res) => {
//     const users = require('./db/users.json');

//     if (users.email === req.body.uEmail && users.password === req.body.uPassword) {
//         isLogin = true;
//         res.redirect('/gamesuit');
//     } else {
//         res.render("login", {
//             error:'Your email or password was wrong', title:"Login"
//         });
//     }
// }); 

const {Gamesuit, GamesuitBiodata, GamesuitHistory} = require("./models");

app.get("/", async(_, res) => {
    const data = await Gamesuit.findAll ({
        include: [GamesuitBiodata, GamesuitHistory],
    });
    res.json(data);
});

app.get("/whoami", apiRestrict, (req, res) => {
    res.json(req.user);
});



const userGame = require("./routes/gamesuit")
const userGameHistory = require("./routes/gamesuitHistory")
const userGameBiodata = require("./routes/gamesuitBiodata")

app.use(userGame);
app.use(userGameHistory);
app.use(userGameBiodata);

app.listen(port, () => console.log("Server Running ..."));