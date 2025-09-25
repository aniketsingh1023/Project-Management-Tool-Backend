import mongoose , {Schema} from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new Schema(
    {
        avatar:{
            type:{
                url:String,
                localPath: String,
            },
            default:{
                url:`https://placehold.co/200x200`,
                localPath:""
            }
        },
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase: true,
            trim: true,
            index: true,
         },
        email:{
            type:String,
            required: true,
            unique: true,
            lowercase:true,
            trim:true
        },
        fullName:{
            type:String,
            trim: True
        },
        password:{
            type:String,
            requred:[true, "Password is required"]
        },
        isEmailVerified:{
            type:Boolean,
            default: false
        },
        refreshToken:{
            type:String
        },
        forgotPasswordToken:{
            type:String
        },
        forgotPasswordExpiry:{
            type:Date
        },
        emailVerificationtoken:{
            type:String
        },
        emailVerificationExpiry:{
            type:Date
        }
        
     },{
        timestamps: true,
     },
    
);

//hooks , prehooks , post hooks 
// search for hooks on moongoose website
userSchema.pre("save", async function(next){
    //safeguard so that this does not running again and again if we are not changing the passsword
    
    if(!this.isModified("password")) return next()
   this.password =  await bcrypt.hash(this.password,10)
    next()
})
export const User = mongoose.models("User", userSchema)