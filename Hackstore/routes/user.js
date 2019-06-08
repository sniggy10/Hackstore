const express = require('express');
const router=express.Router();
const mongoose = require('mongoose');

const passport=require('passport');
const passportLocal=require('passport-local');
const passportLocalMongoose=require('passport-local-mongoose');
const app=express();
const cors=require('cors')
const User = require('../model/userModel');
const Idea=require('../model/ideaModel')

router.get('/blog',isLoggedIn,(req,res)=>{
    //console.log(req.user);

   Idea.find({'user.id': req.user.email},(err,ideas)=>{
        if(err){
            console.log(err);
        }
        else
        {
           res.json(ideas);
        }
   });

   router.get('/signup',(req,res)=>{
    res.send('idea/signup');
});

router.post('/signup',(req,res)=>{
    var newUser = new User({nmae: req.body.name, email: req.body.email});
    User.register(newUser,req.body.password, (err,author)=>{
        if(err){
            console.log(err);
            res.redirect('/')
        }
        passport.authenticate("local")(req,res, ()=>{
        res.redirect('/idea')
        })
    } );
});

router.get('/login',(req,res)=>{
    res.send('user/login');
});

router.post('/login',passport.authenticate("local",{
    successRedirect: "/ideas",
    failureRedirect: "/user/login"
}),(req,res)=>{
    
});

router.get('/logout',(req,res)=>{
    req.logOut();
    res.redirect('/');
})


router.get('/',(req,res)=>{
    res.send('user/blog');
})
function isLoggedIn(req,res,next){
   // console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/user/login');
}

module.exports = router;


// const userModel = require('../model/userModel');
// router.get('/',function(req,res){
//     userModel.find({email:req.body.email})
//     .exec()
//     .then((user)=>
//     {
//       window.open('')
//     }) 
// });

// router.post('/login',function(req,res){
//     const newUser= new userModel({
//         _id : new mongoose.Types.ObjectId(),
//         name : req.body.name,
//         email : req.body.email,
//         password : bcryptjs.hashSync(req.body.password,31)
//     });
//     console.log(req.body);
//     res.json(req.body).status(200);

//  userModel.find({email:req.body.email})
//  .exec()
//  .then(mail=>{
//     console.log(mail);
//     if(mail!=null){
//         console.log(mail);
//         res.json(mail)
//         window.open('../../blog.html')
//      }
//     else{
        
//     }
//  })
//  .catch((error)=>{
//     console.log("Error");
//  });
// });

// router.get('/login',function(req,res){
//     // db.userSchema.find({email : "Smith"}).forEach(printjson);

// });

// router.post('/signup',function(req,res){
//     const newUser= new userModel({
//         _id : new mongoose.Types.ObjectId(),
//         name : req.body.name,
//         email : req.body.email,
//         password : bcryptjs.hashSync(req.body.password,31)
//         // password2: bcryptjs.hashSync(req.body.password,31)
//     });
//     userModel.find({email:req.body.email})
//     .exec()
//     .then(mail=>{
//        console.log(mail);
//        if(mail!=null){
//            console.log(mail);
//            res.json(mail)
//         }
//        else{
//            console.log(mail);
//        }
//     })
//     .catch((error)=>{
//        console.log("Error");
//     });
//    });

// module.exports=router;