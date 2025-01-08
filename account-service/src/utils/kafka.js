const { Kafka } = require('kafkajs');

const kafka = new Kafka({ clientId: 'account-service', brokers: ['localhost:9092'] });
const producer = kafka.producer();

async function sendToKafka(topic, message) {
  await producer.connect();
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(message) }],
  });
}

module.exports = { sendToKafka };
