require('dotenv').config({ path: 'variables.env' });
const { send } = require('../mail');

(async function sampleSend() {
  // send email to the new user
  try {
    await send({
      filename: 'confirmed_email_subscriber',
      to: 'setemiojo@gmail.com',
      subject: 'Test Email',
    });
    console.log('Email Sent 💌');
  } catch (error) {
    console.error('some dangerous happened');
  }
})();
