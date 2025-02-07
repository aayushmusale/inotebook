const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');                   // importing bcryptjs for hashing/salting for passwords
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')
const JWT_SECRET = 'AayushBhaiAngaarH@i'
router.use(express.json());

// eligibility for login
//ROUTE 1: Create a User using: POST "localhost:5000/api/auth/createuser". No login required
router.post('/createuser', [
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long.'),
    body('email').isEmail().withMessage('Email must be a valid email address.'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long.'),
    body('date').optional().isDate().withMessage('Date must be a valid date if provided.')
], async (req, res) => {

    // If there are errors, return Bad request and the errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }

    // Check whether the user with same email exists already
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "User with this email already exists, try a different email\n" });
        }

        const salt = await bcrypt.genSalt(10);  //salt length to generate the hash pass
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Create the user
        user = await User.create({
            name: req.body.name,
            password: secPass,          // hashed password
            // password: req.body.password
            email: req.body.email 
        });

        // generate a token of User-Id and secret key for the user
        const data = {
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.status(201).json({ authToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//ROUTE 2: Authenticate a User using: POST "localhost:5000/api/auth/login". No login required
router.post('/login', [
    body('email').isEmail().withMessage('Please enter valid credentials'),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {

    // If there are errors, return Bad request and the errors
    // returns the errors if any present in the request
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }

    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({error:"Please enter the correct credentials"});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare)
        {
            return res.status(400).json({error:"Please enter the correct credentials"});
        }

        // Generate JWT token and send it in response
        const data = {
            user:{
                id : user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        res.status(201).json({authToken});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
 
    }
});


//ROUTE 3: Get logged-in user details using: POST "localhost:5000/api/auth/getuser". login required
router.post('/getuser', fetchuser ,async (req, res) => {
    try{
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;
