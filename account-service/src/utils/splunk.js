const axios = require('axios');

const SPLUNK_URL = process.env.SPLUNK_URL;
const SPLUNK_HEC_TOKEN = process.env.SPLUNK_HEC_TOKEN;
console.log("SPLUNK_URL:", SPLUNK_URL);
console.log("SPLUNK_HEC_TOKEN:", SPLUNK_HEC_TOKEN);

async function logToSplunk(event) {
  if (!SPLUNK_URL || !SPLUNK_HEC_TOKEN) {
    console.error("SPLUNK_URL or SPLUNK_HEC_TOKEN is missing in environment variables.");
    return;
  }

  try {
    await axios.post(
      SPLUNK_URL,
      { event },
      { headers: { Authorization: `Splunk ${SPLUNK_HEC_TOKEN}` } }
    );
    console.log('Event logged to Splunk successfully');
  } catch (error) {
    console.error('Error logging to Splunk:', error.message);
  }
}

module.exports = { logToSplunk };
