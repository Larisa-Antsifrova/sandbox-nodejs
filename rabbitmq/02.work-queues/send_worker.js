const amqp = require('amqplib');

const queueName = 'task-queue';
const message = process.argv.slice(2).join(' ') || 'Hello there from tasks!';

const sendTask = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  await channel.assertQueue(queueName, { durable: true });

  channel.sendToQueue(queueName, Buffer.from(message), { persistent: true });

  console.log('sent: ', message);

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
};

sendTask();
