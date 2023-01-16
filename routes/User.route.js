const express = require('express');
const userRouter  = express.Router();
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const { UserModel } = require("../model/user.model")

// signup route
userRouter.post("/register",async (req, res) => {
    const { name, email, password, age } = req.body;
//    console.log(name,email, password, age )
    try {
        const data = await UserModel.find({ email: email });
        console.log(data)
        if (data.length>0) {
            
           res.send("user already registered. please use different email addresses")
        } else {
            bcrypt.hash(password, 3, async (err, hassed_password) => {
                
                if (err) {
                    console.log(err)
                } else {
                    let user = new UserModel({name, email, password:hassed_password, age})
                    await user.save()
                    res.send("user successfully registered")
                }

             });
            
        }
    } catch (err) {

        res.send(err.message);
    }
})




// login route
userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.find({ email })
        const hassed_password = user[0].password
        // console.log(user)
       
        if (user.length > 0) {
            bcrypt.compare(password, hassed_password , (err, result) => {
                if (result) {
                     const token = jwt.sign({ userID: user[0]._id }, 'masai');
                     res.send({"msg":"login successfull","token":token})
                } else {
                    res.send("wrong credencials")
               }
         
             });
            
        } else {
            
            res.send("wrong credentials")
        }
    } catch (err) {
        console.log("login failed");
        console.log(err.message)
        res.send(err.message);
    }
})


module.exports = {
    userRouter
};