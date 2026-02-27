import express from 'express';
const app = express();
app.use(express.json());
const otpStore = {};
app.post('/generate-otp', (req, res) => {
    const email = req.body.email;
    if (!email) {
        return res.json(400).json({ message: "Email is req" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // generate-otp of a 6 digit
    otpStore[email] = otp;
    console.log(`Opt for ${email} : ${otp} `); // log the opt to the console
    res.status(200).json({ message: "Otp generate and logged" });
});
app.post("/reset-password", (req, res) => {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
        return res.status(400).json({ message: "email,otp and new password req" });
    }
    if (otpStore[email] === otp) {
        console.log(`password for ${email} has been reset to : ${newPassword}`);
        delete otpStore[email];
        res.status(200).json({ message: "Password has been reset successfully" });
    }
    else {
        res.status(401).json({ message: "invalid OTP" });
    }
});
app.listen(3000, () => console.log("server is running on port 3000"));
//# sourceMappingURL=index.js.map