const { render } = require("ejs");

var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    methodeOverride =require("method-override"),
    LocalStrategy = require("passport-local"),
    campground  = require("./models/campground.js"),
    comment     = require("./models/comments.js"),
    User        = require("./models/user"),
    seedDB      = require("./seeds.js");
    //require Routes
    var commentRoutes    = require("./routes/comments.js"),
        campgroundRoutes = require("./routes/campgrounds.js"),
        indexRoutes      = require("./routes/index.js");



app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost/yelp_camp_v9");


app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodeOverride("_method"));
const port=8081;
//seedDB();
// this is a middlewaire that will run between


//Passport Configuration
//initialise session
app.use(require("express-session")({
    secret : "Once again Rusty wins cutest dog !",
    resave : false,
    saveUninitialized : false
}));
//
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    console.log("the current user is "+req.user);
    res.locals.currentUser=req.user; //where ever is inside res.locals will pass out to our templates
    next();  // to go to the next code
});


app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);



app.listen(port,function(){
    console.log("server is running on port "+port);
});