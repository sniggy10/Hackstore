const mongoose = require('mongoose');
const ideaSchema= mongoose.Schema({

_id : mongoose.Schema.Types.ObjectId,

email:{type:String,ref:'user',required:true},
name:{type:String,ref:'user',required:true},
title : {type:String,required:true},
idea : {type:String,required:true},
tag : {type:String,required:false},
count:{type:Number,required:false,default:0}
});

module.exports = mongoose.model('idea',ideaSchema);
