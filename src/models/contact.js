const mongoose=require("mongoose");
const userInputSchema=new mongoose.Schema({
 name:{
    type:String,
   //  required:true
 },
 email:{
    type:String,
   //  required:true
 },
 phone:{
    type:Number,
   //  required:true,
    unique:false
    
 },
 message:{
    type:String,
   //  required:true
 },
 website:{
   type:String,
   // required:true
 },
//  emailId:{
//    type:String,
//    // required:true
//  }
})

const User= new mongoose.model("USER",userInputSchema);           //collection name---> User
module.exports=User;