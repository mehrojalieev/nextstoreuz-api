const express = require("express");
const Joi = require("joi");
const UserSchema = require("../models/users");

const router = express.Router();

// Validation schema for registration
const userValidationSchema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().trim().required()
});

/** 
 * @swagger
 * /api/user/all:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: All users were retrieved successfully
 *         content: 
 *           application/json:
 *             schema: 
 *               type: array
 *               items: 
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   firstname:
 *                     type: string
 *                   lastname:
 *                     type: string
 *                   email:
 *                     type: string
 *                   password:
 *                     type: string
 *                   role:
 *                     type: string
 */

// Route to get all users
router.get("/user/all", async (req, res) => {
    try {   
        const AllUsers = await UserSchema.find();
        res.status(200).json(AllUsers);
    } 
    catch (error) {
        res.status(500).json({message: error.message});    
    }
});

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: Enter your firstname
 *                 example: "John"
 *               lastname:
 *                 type: string
 *                 description: Enter your lastname
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 description: Enter your email
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 description: Enter password
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The user ID
 *                 firstname:
 *                   type: string
 *                   description: The user's firstname
 *                 lastname:
 *                   type: string
 *                   description: The user's lastname
 *                 email:
 *                   type: string
 *                   description: The user's email
 *                 password:
 *                   type: string
 *                   description: Password
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date the user was created
 *       400:
 *         description: Validation error or email already exists
 *       500:
 *         description: Server error
 */

// Route to register a new user
router.post("/auth/register", async (req, res) => {
    // Validate user input
    const { error, value } = userValidationSchema.validate(req.body, { stripUnknown: true });
    
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        // Check if user with the same email exists
        const userExists = await UserSchema.findOne({ email: value.email });

        if (userExists) {
            return res.status(400).json({ message: "Email already exists!" });
        }

        // Create new user
        const newUser = await UserSchema.create(value);
        res.status(200).json(newUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
