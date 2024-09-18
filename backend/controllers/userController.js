import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import validator from "validator"
import 'dotenv/config'

const loginUser = async (req,res) => {
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false, message:"User does not exist"});
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.json({success:false, message:"Wrong Password"});
        }

        const token = createToken(user._id);
        return res.json({success:true, token});

    } catch (error) {
        console.log(error);
        return res.json({success:false, message:"Failed to Login"});
    }
    
}

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

const registerUser = async (req,res) => {
    const {name, password, email} = req.body;
    try {
        const exists = await userModel.findOne({email});
        if (exists){
            return res.json({success:false, message:"User already exists"});
        }
        
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Invalid Email"});
        }
        if(password.length<8){
            return res.json({success:false,message:"Weak Password"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name : name,
            email : email,
            password : hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        return res.json({success:true, token});

    } catch (error) {
        console.log(error);
        return res.json({success:false, message:"Failed to register user"});
    }
}

export {loginUser,registerUser}
