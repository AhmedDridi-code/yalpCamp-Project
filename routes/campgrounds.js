var express = require("express");
var router = express.Router({mergeParams:true});
var campground = require("../models/campground");
const { findByIdAndUpdate } = require("../models/comments");

router.post("/",isLoggedIn,function(req,res){
    var name =req.body.name;
    var image=req.body.image;
    var desc=req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground={name:name,image:image,description:desc,author:author};
 
    //campgrounds.push(newCampground);
    //Create a new Campground
    campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
            res.redirect("/");
        }
    })
    
    
    });
router.get("/new",isLoggedIn,function(req,res){
    res.render("campgrounds/new");
})

router.get("/",function(req,res){
campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
    });


});
router.get("/:id",function(req,res){
    campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/show",{campground:foundCampground});
        }
    })
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit",checkCampgroundOwnership,function(req,res){
    
    
    
        campground.findById(req.params.id,function(err,foundCampground){
            if(err){
                console.log(err);
                res.redirect("/campgrounds");
            }else{

                res.render("campgrounds/edit",{campground:foundCampground});
               
            }
        })
  


});

//UPDARE CAMPGROUND ROUTE
router.put("/:id",checkCampgroundOwnership,function(req,res){
    //find and update the correct campground
    var data
    campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/"+updatedCampground._id);
        }
    });
    //redirect somewhere(show page)
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id",checkCampgroundOwnership,function(req,res){
    campground.findByIdAndRemove(req.params.id,function(err){
        if (err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");  
        }
    })
})

//middleware to check if the user is logged in
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect("/login");
    }
};
//middleware to check for Autorisation
function checkCampgroundOwnership(req,res,next){
    //is user logged in ?
    if(req.isAuthenticated()){
        campground.findById(req.params.id,function(err,foundCampground){
            if(foundCampground.author.id.equals(req.user._id)){
                next();
                      
           }else{
               res.redirect("back");
           } 
        })
         //does the user own the Campground
      //redirect somewhere
    }else{
        res.redirect("/login");
    }

}


module.exports = router;