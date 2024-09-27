const express = require("express");
const Joi = require("joi");
const UserSchema = require("../models/users");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

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
        res.status(500).json({ message: error.message });
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
    const { error, value } = userValidationSchema.validate(req.body, { stripUnknown: true });

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const userExists = await UserSchema.findOne({ email: value.email });

        if (userExists) {
            return res.status(400).json({ message: "Email already exists!" });
        }

        const hashedPassword = await bcrypt.hash(value.password, 10)
        value.password = hashedPassword

        const newUser = await UserSchema.create(value);
        res.status(201).json({
            data: newUser,
            message: "Registered successfully"
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User email
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 description: User password
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for the authenticated user
 *                 message:
 *                   type: string
 *                   description: Login success message
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Server error
 */

const JWT_SECRET = "Yh28$s%45jh6hU(*&^KJ(&(*kjhdSJ(&*hsdb273j";

// LOGIN 
router.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserSchema.findOne({ email: email })
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password !" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Password !" })
        }

        const userJWT = {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password,
            role: user.role
        }

        const token = jwt.sign(userJWT, JWT_SECRET, { expiresIn: "5d" })
        res.status(200).json({
            ststus: "OK",
            message: "Login Successfully",
            token: token
        })

    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})
module.exports = router;
