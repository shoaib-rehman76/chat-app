const express = require('express');
const cors = require('cors')
require('dotenv').config()
const cookieParser = require('cookie-parser');
const connectDb = require('./config/server');
const morgan = require('morgan');
const router = require('./routes/userRoutes');
const messageRouter = require('./routes/messageRoute');
const bodyParser = require('body-parser');
const path = require('path');
const { server, app } = require('./socket/socket')

// const server = http.createServer(app)
const PORT = process.env.PORT

const corsOpts = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
};

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors(corsOpts))
app.use(cookieParser())
app.use(express.json())
app.use(morgan('dev'));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }))
app.use('/api/v1/user', router)
app.use('/api/v1/message', messageRouter)

app.get('/', (req, res) => {
    res.send('<h1 style="text-align:center">Server is Connected Successfully!</h1>')
})

connectDb()
server.listen((PORT), () => console.log(`App is listening on port ${PORT}`))
