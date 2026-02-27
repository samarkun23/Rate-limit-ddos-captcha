import express from 'express'
import rateLimit from 'express-rate-limit';

const app = express();
app.use(express.json())

const otpLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: "Too many OTP requests from this IP, please try again after 15 minutes",
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

const passwordResetLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: "Too many password reset attempts from this IP, please try again after 15 minutes",
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})


const otpStore: { [key: string]: string } = {}

app.post('/generate-otp', otpLimiter, (req, res) => {
    const email = req.body.email;
    if (!email) {
        return res.json(400).json({ message: "Email is req" })
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();// generate-otp of a 6 digit
    otpStore[email] = otp;

    console.log(`Opt for ${email} : ${otp} `)// log the opt to the console
    res.status(200).json({ message: "Otp generate and logged" });
})

app.post("/reset-password", passwordResetLimiter, (req, res) => {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
        return res.status(400).json({ message: "email,otp and new password req" })
    }
    if (otpStore[email] === otp) {
        console.log(`password for ${email} has been reset to : ${newPassword}`);
        delete otpStore[email];
        res.status(200).json({ message: "Password has been reset successfully" });
    } else {
        res.status(401).json({ message: "invalid OTP" });
    }

})


app.listen(3000, () => console.log("server is running on port 3000"))


