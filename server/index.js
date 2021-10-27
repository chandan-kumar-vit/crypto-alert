const connectToMongo=require('./db.js')
const express=require('express')
var cors = require('cors'); 
const { sendMail } = require('./mail/mailer.js');


const app=express();
const port=5000;
connectToMongo();
app.use(express.json())
app.use(cors())

// Send mails if targets are achived (Check after every minute)

sendMail()

// Available routes

app.use('/api/auth', require('./routes/auth'));
app.use('/api/alerts', require('./routes/alerts'));

app.listen(port, () => {
    console.log(`Server of crypto-alert listening at http://localhost:${port}`)
})