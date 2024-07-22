
const Conversation = require('../models/conversationModel.js');
const Message = require("../models/messageModel.js");
const { io, getReceiverSocketId } = require('../socket/socket.js');

const sendMessage = async (req, res) => {
    try {
        let senderId = req.userInfo.user?._id;
        let receiverId = req.params.id;
        const { message } = req.body;

        let gotConversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        })

        if (!gotConversation) {
            gotConversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        })

        if (newMessage) {
            gotConversation.messages.push(newMessage._id)
        }

        await Promise.all([gotConversation.save(), newMessage.save()]);

        // socket io

        const receiverSocketId = getReceiverSocketId(receiverId)

        console.log(receiverSocketId, 'rs id-------->');
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', newMessage)
        }


        return res.status(201).json({
            status: 'success',
            message: 'message send successfully',
            data: newMessage
        })

    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'server error'
        })
    }
}

const getMessage = async (req, res) => {

    console.log(req.params.id, 'id--------->');
    try {
        const receiverId = req.params.id
        const senderId = req.userInfo.user?._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages")

        res.status(201).json({
            status: 'success',
            message: 'messages loaded successfully',
            data: conversation?.messages
        })

    } catch (error) {
        console.log(error);
    }
}

module.exports = { sendMessage, getMessage }