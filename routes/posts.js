const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
    res.json({
        post:{
            title: "My first post",
            description: "Something you shouldn't see without permission."
        }
    });

});


module.exports = router;