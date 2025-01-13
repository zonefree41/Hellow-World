require('dotenv').config();
const express = require('express');
const Twilio = require('twilio');

const app = express();
const port = process.env.PORT || 3000;

// Get your Twilio SID and Auth Token from the Twilio Console
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = new Twilio(twilioAccountSid, twilioAuthToken);

// Serve static files (e.g., the HTML file you created)
app.use(express.static('public'));

// Endpoint to generate the Twilio Access Token
app.get('/token', (req, res) => {
    const capability = new Twilio.jwt.Capability(twilioAccountSid, twilioAuthToken);
    capability.allowClientOutgoing('your_twilio_app_sid');  // Replace with your Twilio app SID

    // Optionally, allow incoming calls
    capability.allowClientIncoming('clientIdentifier'); // Use the identifier for your incoming call client

    const token = capability.generate();
    res.json({ token: token });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
