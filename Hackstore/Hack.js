const express = require('express');
const morgan=require('morgan');

const port=3006;
const parser=require('body-parser');
const mongoose=require('mongoose');
const passport=require('passport');
const passportLocal=require('passport-local');
const passportLocalMongoose=require('passport-local-mongoose');
const app=express();
const cors=require('cors')
app.use(morgan('dev'));
app.use(parser.json());
app.use(parser.urlencoded({extended:true}));
const user=require("./routes/user")
const idea=require("./routes/idea")
const userMod=require("./models/userModel")
const ideaMod=require("./models/ideaModel")


mongoose.connect("mongodb+srv://sniggy10:9835191372@cluster0-uyooo.mongodb.net/test?retryWrites=true",function(err){

if(err)
{
    console.log(err);
}
else{
    console.log("Atlas connected");
}
})
app.use('/user',user);
app.use('/idea',idea);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname+'/public'));
passport.use(new localStrategy(userMod.authenticate()));
passport.serializeUser(userMod.serializeUser());
passport.deserializeUser(userMod.deserializeUser());
app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    next();
});
app.use(require('express-session')({
  secret: "Ishan bakshi",
  resave: false,
  saveUninitialized: false
}));

app.post('/',(req,res)=>{
console.log("frsgjf");
});

  app.get('/',(req,res)=>{
    console.log("gft")
  })




// app.get('/',function(req,res){
//   res.sendFile(path.join(__dirname+'/index.html'));

app.listen(port,function(){
      console.log(`Server is running ${port}`);
  })