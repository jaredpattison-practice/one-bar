`use strict`;

const express = require('express');
const app = express();


// Load environment variables from .env file
require('dotenv').config();


const PORT = process.env.PORT;
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = require('twilio')(accountSid, authToken);

app.get('/weather', (request,response) => {
  console.log('weather route hit');
  client.messages
    .create({
      body: 'Hello Jared, Somebody pinged the weather route. Hi Andrew!',
      from: '+12537859363',
      to: '+12068497029'
    })
    .then( message => {
      console.log(message.sid);
      response.send('Look out the window for the weather!');
    })
    .done();
});

app.get('/trails', (request, response) => {
  console.log('trail route hit');
  client.messages
    .create({
      body: 'Trail info, thanks for pinging me!',
      from: '+12537859363',
      to: '+12068497029'
    })
    .then(message => {
      console.log(message.sid);
      response.send('You tell me!');
    })
    .done();
})

app.get('*', (request, response) => {
  response.send('Hitting the API');
})

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message('The Visgoths are coming! Head for the hills!');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
