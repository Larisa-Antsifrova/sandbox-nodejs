const amqp = require('amqplib');

const queueName = 'first-queue';
const message =
  'Here comes the first message for RabbitMQ in history of this machine!';

const publishMessage = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  await channel.assertQueue(queueName, { durable: false });

  channel.sendToQueue(queueName, Buffer.from(message));

  console.log('sent: ', message);

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
};

publishMessage();
