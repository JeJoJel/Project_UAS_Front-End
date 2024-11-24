const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth'); 

router.post('/register', authController.register);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/app/views/index.html'));
});


module.exports = router;
