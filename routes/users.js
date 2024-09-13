const express = require("express")
const Joi = require("joi")
const UserSchema = require("../models/users")

const router = express.Router()

const userValidationSchema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().trim().required()
})


router.post("/auth/register", async (req, res) => {

    const { error, value } = userValidationSchema.validate(req.body, { stripUnknown: true })
    
    if (error) return res.status(400).json({ message: error.details[0].message });

    let userExict = UserSchema.find({email: value.email})

    if(userExict){
        return res.status(400).json({message: "Email already exists !"})
    }

    try {
        const NewUser = await UserSchema.create(value)
        res.status(200).json(NewUser)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})


module.exports = router;