const Alert = require('../models/Alert');
const { fetchPrices } = require('./fetchPrices');
const nodemailer = require('nodemailer');
require('dotenv').config()

var transporter = nodemailer.createTransport({

    host: 'smtp.mail.yahoo.com',
    port: 465,
    service: 'yahoo',
    secure: false,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASS
    },
    debug: false,
    logger: true
});


const sendMail = async () => {

    const temp = await fetchPrices();
    const data = await JSON.parse(temp);

    function getPrice(coin) {
        return data.filter(
            function (data) { return data.name == coin }
        );
    }

    Alert.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user_info",
            },
        },
        {
            $unwind: "$user_info",
        },
        { $match: { status: "active" } }
    ]).then( async (result) => {

        for (let i = 0; i < result.length; i++) {

            const found = getPrice(result[i].crypto);

            if ((result[i].minAmt < found[0].current_price) && (found[0].current_price < result[i].maxAmt)) {
                var mailOptions = {
                    from: process.env.EMAIL_USERNAME,
                    to: result[i].user_info.email,
                    subject: `Alert! ${result[i].crypto} has hit your target!`,
                    html: `<h2> Crypto-Tracker </h2> <br> Hi ${result[i].user_info.name}, <br>
                    <p>Congrats!! you have hit the bulls eye. Price of ${result[i].crypto} have come to your target price, current price is ₹ ${found[0].current_price}. Invest ASAP for exorbitant benefits<br></p> 
                    <p>Regards Crypto-Tracker </p>`
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });

                await Alert.findByIdAndUpdate(result[i]._id, {status:'triggered'})
            }
        }

    })
        .catch((error) => {
            console.log(error);
        });

    setTimeout(sendMail, 60000);
}


module.exports = { sendMail }