const router = require('express').Router();
const User = require('../model/Users');



//Validation
const Joi = require('@hapi/joi');
const { response } = require('express');

const schema = Joi.object({
    name: Joi.string()
        .min(6)
        .required(),
    email: Joi.string()
        .min(6)
        .required()
        .email(),
    password: Joi.string()
        .min(6)
        .required()
});


router.post('/register', async (req, res) =>{

    //Let's validate the data before save a user
    const {error} = schema.validate(req.body);
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

