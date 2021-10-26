const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const router = express.Router();
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Invest in crypto today';

// ROUTE 1: for registering a new user POST=> /api/auth/signup

router.post('/signup', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be of minimum 5 characters').isLength({ min: 5 })
],

    async (req, res) => {

        // Check if all inputs are in correct format(validation of input)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {

            // Check if same email is registered
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                res.status(400).json({ error: "Sorry! Already user exist" });
            }

            let success=false;
            // Securing password using bcrypt-js
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);

            // Create new user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            });
            console.log(`User ${user.email} added successfully!`);
            success=true;
            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            res.json({ user, authtoken, success });

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    });

// ROUTE 2: for log-in POST=> /api/auth/login

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be blank').exists()
], async (req, res) => {

    // Check if all inputs are in correct format(validation of input)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ error: "Please enter correct credentials" });
        }

        let success=false;
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success=false;
            return res.status(400).json({ success ,error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ user, authtoken, success });
        console.log(`${user.email} Logged-in successfully!`);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 3: Get loggedin User Details using: POST=> "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router