const express = require('express');
const router=express.Router();
const mongoose=require('mongoose');
const User = require('../model/userModel');
const Idea = require('../model/ideaModel');
const cors = require('cors');

router.get('/allIdeas',cors(),(req,res)=>{
    Idea.find({},(err,allIdeas)=>{
        res.json({ideas});
    })
})


router.get('/',isLoggedIn,(req,res)=>{
   Ideas.find({}, (err,ideas)=>{
        if (err){
            console.log(err);
            res.redirect('/');
        }
        else
        {
            res.json(ideas);
        }
    })
});


router.post('/',isLoggedIn, (req,res)=>{
    User.findById(req.user._id,(err,user)=>{
        if(err){
            console.log(err);
        }
        
    Ideas.create
    ({
    title: req.body.title,
    idea: req.body.idea,
    tag: req.body.tag,
    count: req.body.count,
    users: {id:req.user._id , name: user.name,email:user.email} //add author
    })
    
    res.redirect('/ideas');

    })
    
})


function isLoggedIn(req,res,next){
    // console.log(req.isAuthenticated());
     if(req.isAuthenticated()){
         return next();
     }
     res.redirect('/author/login');
}


















// router.get('/ideas',function(req,res){
   
//     ideaModel.find()
//     .exec()
//     .then(ideas=>{
//         res.json(ideas)
//     })
// });

// router.post('/',function(req,res){
//     console.log(req.body);
//     res.json(req.body).status(200);
//     const newIdea= new ideaModel({
//         _id : new mongoose.Types.ObjectId(),
//         title: req.body.title,
//         idea: req.body.idea,
//         tag : req.body.tag,
//         count:req.body.count
//     });
//     newIdea.save();
//     });

module.exports=router;

    