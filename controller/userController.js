const User = require("../model/userModel");

exports.registerUser = async(req,res)=>{
    try{
        const {email,username,dob} = req.body;

        if(!email || !username || !dob){
            console.log("a field is missing")
            return res.status(400).json({error: "Every field is required"});
            
        }

        const existingUser = await User.findOne({email});

        if(existingUser){
            console.log("user exists");
            return res.status(400).json({message:"User already registred"});
        }

        const user = await User.create({email, username, dob})

        res.status(201).json({messaage:"User registered successfully", user:{name:user.username, email:user.email}})
    }catch(error){
        console.log("error with registration");
        res.status(500).json({error:"Error registering user "});
    }
}