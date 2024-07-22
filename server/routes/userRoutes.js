const express = require('express');
const { upload } = require('../utilities/common');
const router = express.Router()
const { register, login, logout, loadAllUser } = require('../controllers/userController');
const { isUserAuthenticated } = require('../middleware/common');

router.route('/register').post(upload.single('profilePhoto'), register)
router.route('/login').post(login)
router.route('/logout').get(logout)

// router.route('/').get(loadAllUser)
router.route('/').get(isUserAuthenticated, loadAllUser)

module.exports = router