const express = require('express');
const { logToSplunk } = require('../utils/splunk');
const { sendToKafka } = require('../utils/kafka');

const router = express.Router();

router.post('/create', async (req, res) => {
  const { id, name } = req.body;

  // Log to Splunk
  await logToSplunk({ id, name, action: 'Account Created' });

  // Send to Kafka
  await sendToKafka('ACCOUNT_CREATED', { id, name });

  res.status(201).send({ id, name });
});

module.exports = router;