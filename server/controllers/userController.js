const User = require("../models/userModel");
const { generatePassword, confirmPassword, generateToken } = require("../utilities/common");

const register = async (req, res) => {
    try {
        const { fullName, userName, password, confirmPassword, gender, profilePhoto } = req.body


        // if any input is empty
        if (!fullName || !userName || !password || !gender) {
            return res.status(400).json({
                status: 'error',
                message: "All Fields are required",
            })
        }

        // if img not provided
        if (!req.file) {
            return res.status(400).json({
                message: 'Error: No file received'
            });
        }

        // console.log(password, confirmPassword, 'pass confirm');

        // if password not matched
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Password do not match"
            })
        }

        // Hash the password
        const hashedPassword = await generatePassword(password)

        // Check if user already exists
        const existingUser = await User.findOne({ fullName }).select('-password');
        if (existingUser)
            return res.status(400).json({
                status: "failed",
                data: [],
                message: "It seems user already have an account on this name try different",
            });

        // create a new user account
        const filePath = req?.file?.path?.replace(/\\/g, '/');
        const payload = {
            fullName,
            userName,
            password: hashedPassword,
            profilePhoto: filePath,
            gender

        }

        await User.create(payload)

        return res.status(201).json({
            status: 'success',
            message: "user created successfully",
            data: payload
        })

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message || error
        })
    }
}

const login = async (req, res) => {
    try {
        const { userName, password } = req.body

        // if any input is empty
        if (!userName || !password) {
            return res.status(400).json({
                status: 'error',
                message: "All Fields are required",
            })
        }

        // if no user find with the name 
        const user = await User.findOne({ userName })

        if (!user) {
            return res.status(400).json({
                status: 'fail',
                message: "no user found",
            })
        }

        // if password not matched
        const matchedPassword = await confirmPassword(password, user?.password)
        if (!matchedPassword) {
            return res.status(400).json({
                status: 'fail',
                message: "password not matched",

            })
        }

        const token = generateToken(user)
        const payload = {
            id: user._id,
            userName: user.userName,
            fullName: user.fullName,
            profilePhoto: user.profilePhoto,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            token
        }
        res.cookie("accessToken", token, { httpOnly: true, maxAge: 1 * 24 * 60 * 60 * 1000, sameSite: "strict" })
        res.status(200).json({
            status: 'success',
            message: "user login successfully ",
            data: payload,
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error?.message,

        })
    }
}

const logout = async (_, res) => {
    res.clearCookie("accessToken")
    res.status(200).json({
        status: 'success',
        message: "User logged out successfully"
    })
}

const loadAllUser = async (req, res) => {
    try {
        const { user } = req.userInfo

        const allUsers = await User.find({ _id: { $ne: user._id } }).select('-password')

        res.status(201).json({
            status: 'success',
            data: allUsers
        })

    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error?.message
        })
    }
}

module.exports = { register, login, logout, loadAllUser }