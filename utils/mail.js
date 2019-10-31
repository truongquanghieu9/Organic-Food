const nodemailer = require("nodemailer");
const crypto = require("crypto");
const emoji = require("node-emoji");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const {GMAILUSER, CLIENTID, CLIENTSECRET, REFRESHTOKEN, GGOAUTHLINK} = process.env;
const moment = require("moment");

exports.genToken = async() => {
	let buf = await crypto.randomBytes(20);
	return buf.toString("hex");
}

const oauth2Client = new OAuth2(CLIENTID, CLIENTSECRET, GGOAUTHLINK);
oauth2Client.setCredentials({ refresh_token: REFRESHTOKEN });
const accessToken = oauth2Client.getAccessToken();

async function send(to, subject, text) {
	let transport = nodemailer.createTransport({
		service: "Gmail",
		auth: {
			type: "OAuth2",
			user: GMAILUSER,
			clientId: CLIENTID,
			clientSecret: CLIENTSECRET,
			refreshToken: REFRESHTOKEN,
			access: accessToken
		}
	})
	let mailOptions = {
        from: process.env.GMAILUSER,
		to, subject, text
    }
	await transport.sendMail(mailOptions);
}

async function activate(to, viewname, id, host) {
	let subject = emoji.emojify(`:closed_lock_with_key: Activate your account - ORGANIC FOOD`);
	let text = `
Good day ${viewname}, this mail comes from ORGANIC FOOD,

Please click to the link below for completing the activation of your account:
https://${host}/activate/${id}

And that's all, thank you for your time. Have a good day and see you later.

This is the automatic email from the system, please do not reply.`;
	return await send(to, subject, text);
}


async function getRoom(to, viewname, roomName) {
	let subject = emoji.emojify(`:house_with_garden: Your new place is ready, start living now - ORGANIC FOOD`);
	let text = `
Good day ${viewname}, this mail comes from ORGANIC FOOD,

Your place has been arranged, everything is ready and you will stay in room ${roomName}. You can come and live from now.

This is the automatic email from the system, please do not reply.`;
	return await send(to, subject, text);
}

async function leaveRoom(to, viewname, roomName) {
	let subject = emoji.emojify(`:dash: Your staying contract has come to the end - ORGANIC FOOD`);
	let text = `
Good day ${viewname}, this mail comes from ORGANIC FOOD,

You have been removed from room ${roomName}.
We will notify you about your place as soon as possible if there are any changes made.

This is the automatic email from the system, please do not reply.`;
	return await send(to, subject, text);
}

async function contactUser(to, viewname, content, title) {
	let subject = emoji.emojify(`:calling: Owner had sent - ${title} - ORGANIC FOOD`);
	let text = `
Good day ${viewname}, this mail comes from ORGANIC FOOD,

${content}.`;
	return await send(to, subject, text);
}

async function amountElectric(viewname, roomName, amount) {
	let subject = emoji.emojify(`:zap: ${viewname} from ${roomName} had sent - Amount eletric in this month - ORGANIC FOOD`);
	let text = `
Hello Owner, this mail of ${viewname} comes from ${roomName},

Electric number at ${moment().format("DD-MM-YYYY")} is ${amount}.`;
	return await send(GMAILUSER, subject, text);
}

module.exports = {send, activate, getRoom, leaveRoom, contactUser, amountElectric}
