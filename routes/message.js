var express = require('express');
var router = express.Router({ mergeParams: true });
var fetch = require('node-fetch');
var util = require('util');

router.post('/', function (req, res, next) {


    async function sendSMS() {
        const payload = {
            sender: "Au2fix.ro",
            message: req.body.message.body,
            recipients: [
                { msisdn: 45 + req.body.message.number },
            ],
        };

        const apiToken = process.env.GATEWAY_API;
        const encodedAuth = Buffer.from(`${apiToken}:`).toString("base64");

        const resp = await fetch("https://gatewayapi.com/rest/mtsms", {
            method: "post",
            body: JSON.stringify(payload),
            headers: {
                Authorization: `Basic ${encodedAuth}`,
                "Content-Type": "application/json",
            },
        });
        const json = await resp.json()
        console.log(util.inspect(json, { showHidden: false, depth: null }));
        if (resp.ok) {
            console.log("congrats! messages are on their way!");
        } else {
            console.log("oh-no! something went wrong...");
        }
    }

    sendSMS();
    next();
    res.redirect('back')

})



module.exports = router