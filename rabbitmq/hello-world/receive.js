const amqp = require('amqplib');

const queueName = 'first-queue';

const consumeMessage = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  await channel.assertQueue(queueName, { durable: false });

  console.log(`waiting for messages in queue: ${queueName}`);

  channel.consume(
    queueName,
    message => {
      console.log(`[x] Received: ${message.content.toString()}`);
    },
    { noAck: true },
  );
};

consumeMessage();
