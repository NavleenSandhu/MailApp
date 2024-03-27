const express = require('express')
const nodemailer = require("nodemailer");
const cors = require('cors')
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "navleensandhu2007@gmail.com",
        pass: "sdzuqivvomlqjoad",
    },
});

const app = express()
app.use(express.json())
app.listen(5200)

const corsOptions = {
    origin: 'https://navleensandhu.github.io/Portfolio'
}
app.use(cors(corsOptions))

app.get('/', async (req, res) => {
    res.send('Hello')
})

app.post('/', async (req, res) => {
    try {
        const info = await transporter.sendMail({
            from: req.body.from, // sender address
            to: "navleensandhu2007@gmail.com", // list of receivers
            subject: req.body.subject || 'No Subject', // Subject line
            text: req.body.text || '', // plain text body
        });
        res.json({ messageId: info.messageId })
    } catch (error) {
        console.log(error)
    }
})
