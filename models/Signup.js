//defining our schema
const mongoose =require('mongoose');
const passPortLocalMongoose=require('passport-local-mongoose');

const SignupSchema =new mongoose.Schema({
    firstName:{
        type:String,
        trim:true,
        unique:false
},
    lastName:{
        type:String,
        trim:true
},
    email:{
        type:String,
        trim:true,
        unique:true
},
    role: {
        type: String,
        trim: true  
    }, 

    branch: {
    type: String,
    trim: true 
}

});
 
SignupSchema.plugin(passPortLocalMongoose,{
    usernameField:'email',

});

module.exports=mongoose.model('Signup', SignupSchema);