import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { use } from "react";

const userSchema = new Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        
        email:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        
        fullname:{
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        
        avatar:{
            type: String,  //cloudinary url
            required: true,
        },
        coverImage :{
            type: String,
        },
        watchHistory:[
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password:{
            type: String,
            required: [true,"Password is required"]

        },
        refreshToken:{
            type: String
        }
    },
    {timestamps:true}
)



userSchema.pre("save", async function (next ) {
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password,10)
    next()
})  //basically jabhi bhi mujhe kuch save karna ho, use pehle ye karna hai , issliye the "pre" hook.
// and middlewear ka flag ka naam next hai
// jab pwd field bheju tabhi encrypt karana hai, har baar nhi karana hai, eitehr first time, ya phir when updating thats why the if condition

userSchema.methods.isPasswordCorrect = async function (password)
{
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function()
{
    return jwt.sign(
        {
            _id: this._id,  //ye milega mongoDB se
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateAccessToken = function()
{
    return jwt.sign(
        {
            _id: this._id,  //refresh token mein kam details hoti hai, issliye bas id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){}

export const User = mongoose.model("User", userSchema)