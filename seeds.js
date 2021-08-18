var mongoose = require("mongoose"),
comments     = require("./models/comments.js"),
campground   = require("./models/campground.js");
var data = [
    {
        name : "Cloud's Rest",
        image:"https://www.nationalparks.nsw.gov.au/-/media/npws/images/parks/mimosa-rocks-national-park/aragunnu-campground/aragunnu-campground-01.jpg",
        description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus expedita nesciunt pariatur nemo amet, quo assumenda cupiditate molestias enim blanditiis odit corporis, quod voluptates, fugiat aliquid!"
    },
    {
        name : "aain zaghouaan",
        image:"https://www.elacampground.com/wp-content/uploads/2019/06/Ela-Campground-87.jpg",
        description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus expedita nesciunt pariatur nemo amet, quo assumenda cupiditate molestias enim blanditiis odit corporis, quod voluptates, fugiat aliquid!"
    },
    {
        name : "ksour isef",
        image:"https://www.nationalparks.nsw.gov.au/-/media/npws/images/parks/mimosa-rocks-national-park/aragunnu-campground/aragunnu-campground-01.jpg",
        description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus expedita nesciunt pariatur nemo amet, quo assumenda cupiditate molestias enim blanditiis odit corporis, quod voluptates, fugiat aliquid!"
    } 
];



 
function seedDB(){
    campground.remove({},function(err){
        // if(err){
        //     console.log(err);
        // }
        // console.log("removed campgrounds!");
        // data.forEach(function(seed){
        //     campground.create(seed,function(err,campground){
        //         if(err){
        //             console.log(err);
        //         }else{
        //             console.log("campground added");
        //             comments.create({
        //                 text : "this place is great, but i wish there was  internet",
        //                 author : "homer"
        //                 },function(err,comment){
        //                         if(err){
        //                             console.log(err)
        //                         }else{
        //                             campground.comments.push(comment);
        //                             campground.save();
        //                         }
                            
        //                 });
        //             }
        //         });
        //     });
        
    
    });
}
module.exports=seedDB;