const express = require('express');
const { sendMessage, getMessage } = require('../controllers/messageController');
const { isUserAuthenticated } = require('../middleware/common');
const router = express.Router();

router.route('/send/:id').post(isUserAuthenticated, sendMessage)
router.route('/:id').get(isUserAuthenticated, getMessage)

module.exports = router