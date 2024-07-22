const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const salt = bcrypt.genSaltSync(10);
const multer = require('multer');

exports.generatePassword = async (password) => {
    const encryptedPassword = await bcrypt.hash(password, salt)
    return encryptedPassword
}

exports.confirmPassword = async (actualPassword, hashedPassword) => {
    const matchPassword = await bcrypt.compare(actualPassword, hashedPassword)
    return matchPassword
}

exports.generateToken = (user) => {
    const token = jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRY || '1d' })
    return token
}

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + file.originalname);
    }
});

exports.upload = multer({
    storage: storage,
    limits: {
        fileSize: 25 * 1024 * 1024, // 25MB in bytes
    }
})