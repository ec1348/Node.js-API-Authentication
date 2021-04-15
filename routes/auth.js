const router = require('express').Router();
const User = require('../model/Users');
const {registerValidation} = require('../validation');


router.post('/register', async (req, res) =>{

    //Let's validate the data before save a user
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try{
        const saveUser = await user.save();     
        res.send(saveUser);
    }catch(err){
        res.status(400).send(err);
    }
});

module.exports = router;

