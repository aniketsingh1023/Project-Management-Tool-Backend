import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto"
const userSchema = new Schema(
  {
    avatar: {
      type: {
        url: String,
        localPath: String,
      },
      default: {
        url: `https://placehold.co/200x200`,
        localPath: "",
      },
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      trim: True,
    },
    password: {
      type: String,
      requred: [true, "Password is required"],
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
    emailVerificationtoken: {
      type: String,
    },
    emailVerificationExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

//hooks , prehooks , post hooks
// search for hooks on moongoose website
userSchema.pre("save", async function (next) {
  //safeguard so that this does not running again and again if we are not changing the passsword

  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
//matches the hash password in the db
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// gnerate access token using jwt
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY },
  );
};

//generate refresh token using jwt
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            //use shorter payloads for refresh token -good practice
            _id: this._id,

        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
    
    )
}

//temporary token - without jwt for forgot password using crypto library 
userSchema.methods.generateTemporaryToken = function(){
 const unHashedToken =  crypto.randomBytes(20).toString("hex")

 const hashedToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex")
    
 const tokenExpiry = Date.now() + (20*60*1000)
 return{unHashedToken,hashedToken,tokenExpiry}   
};
export const User = mongoose.models("User", userSchema);
