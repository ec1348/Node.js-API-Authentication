const router = require('express').Router();
const User = require('../model/Users');
const bcrypt = require('bcryptjs');
const {registerValidation} = require('../validation');


router.post('/register', async (req, res) =>{

    //Let's validate the data before save a user
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Check if email is exist
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.send('email is exist');

    //Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    


    //Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const saveUser = await user.save();     
        res.send({user:saveUser._id});
    }catch(err){
        res.status(400).send(err);
    }
});

module.exports = router;

