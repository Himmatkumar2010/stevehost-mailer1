const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: "stevehost@gmail.com",
        pass: "xsmtpsib-8dbc814ab447a20e0a41453347bf2d863cac58292be9fd657dadbe52186ce355-cgjLEMGOLENyPqs1"
    }
});

app.get("/", (req, res) => {
    res.send("SteveHost Mailer Running");
});

app.post("/send-otp", async (req, res) => {

    const { email } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000);

    try {

        await transporter.sendMail({
            from: '"SteveHost Security" <stevehost@gmail.com>',
            to: email,
            subject: "Password Reset Code",
            html: `
            <div style="
                font-family:sans-serif;
                padding:20px;
            ">
                <h2>Password Reset</h2>

                <p>Your OTP code is:</p>

                <div style="
                    background:#111;
                    color:#00ff99;
                    padding:15px;
                    font-size:35px;
                    font-weight:bold;
                    border-radius:10px;
                    width:max-content;
                    letter-spacing:5px;
                ">
                    ${otp}
                </div>

                <p>This code expires soon.</p>
            </div>
            `
        });

        res.json({
            success: true,
            otp
        });

    } catch (err) {

        console.log(err);

        res.json({
            success: false
        });
    }
});

app.listen(3000, () => {
    console.log("Server Running");
});