const User = require("../models/user")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



async function handleSignUp(req, res) {
    try {
        const { name, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10);

        // const existingUser = await USER.findOne({email})

        // if(existingUser){
        //     return res.status(400).json({error:"User is exist"})
        // }

        const newUser = await User.create({
            name, email, password: hashedPassword
        });
        return res.status(201).json({ newuser: newUser, msg: "created sucessfully" })

    } catch (error) {
        console.log("Error", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

async function handleLogin(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: "Invalid Email or Password" });

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return res.status(401).json({ error: "Invalid Email or Password" });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        console.log(token)
      return  res.json({user:user , token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server Error" })
    }
};



module.exports = {
    handleSignUp,
    handleLogin
}