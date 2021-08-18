var express = require("express");
var router = express.Router({mergeParams:true});

var campground = require("../models/campground");
var comment = require("../models/comments");


router.get("/new",isLoggedIn,function(req,res){
    campground.findById(req.params.id,function(err,campground){
        if(err){
            res.redirect("/campgrounds/"+req.params.id);
        }else{
            res.render("comments/new",{campground:campground,currentUser:req.user});
        
        }

    });
    
});

router.post("/",isLoggedIn,function(req,res){
    campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            comment.create(req.body.comment,function(err,comment){
                if (err){
                    console.log(err);
                }else{
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;

                    //save  comment
                    comment.save();

                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+campground._id);
                }
        
            });

        }
    });
    
});
//EDIT COMMENT ROUTE

router.get("/:comment_id/edit",checkCommentOwnership,function(req,res){
    comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            res.redirect("back");
        }else{
            res.render("comments/edit",{campground_id:req.params.id,comment:foundComment});
        }
    })


});

//COMMENT UPDATE ROUTE
router.put("/:comment_id",checkCommentOwnership,function(req,res){
    comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedCampground){
    if(err){
        res.redirect("back");
        }
    else{
        res.redirect("/campgrounds/"+req.params.id);
        }
    })
});

//COMMENT DESTROY 
router.delete("/:comment_id",checkCommentOwnership,function(req,res){
comment.findByIdAndRemove(req.params.comment_id,function(err){
    if(err){
        res.redirect("back");
    }
    else{
        res.redirect("back");
    }
})
});


//middleware to check for Autorisation
function checkCommentOwnership(req,res,next){
    //is user logged in ?
    if(req.isAuthenticated()){
         //does the user own the Campground
         comment.findById(req.params.comment_id,function(err,foundComment){
             if (err){
                 res.redirect("back");
             }else{

                if(foundComment.author.id.equals(req.user._id)){
                    next();
                          
               }else{
                   res.redirect("back");
               }
                
             }
            
        });
       

      //redirect somewhere
    }else{
        res.redirect("/login");
    }

}

//is logged in MiddleWhere
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect("/login");
    }
};

module.exports = router;