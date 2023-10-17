const mongoose =require('mongoose');
const Schema =mongoose.Schema;
const joi = require('joi');

// loginUserFields create..............

const loginuser = new Schema({
   
    userName:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type:String,
        minlenght:3,
        // required: true
    },
    token:{
        type:String,
        
    },
    email:{
        type:String,
        unique: true,
        required: true,
        trim:true,
        // validate(value){
        //     if(!validator.isEmail(value)){
        //         throw new Error("Email is invaild")
        //     }
        // }
    }


},{ tinestamps:true  
    
})

const loginUsers= mongoose.model('app-user',loginuser)

module.exports=loginUsers;



// const validate = (loginuser) => {
//     const schema = joi.object({
//         name: joi.string().required(),
//         email: joi.string().email().required(),
//         password: joi.string().required(),
//     });
//     return schema.validate(loginuser);
// };

// module.exports = { loginuser, validate };