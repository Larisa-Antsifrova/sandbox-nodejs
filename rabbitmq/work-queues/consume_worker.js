const amqp = require('amqplib');

const queueName = 'task-queue';

const consumeTask = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  await channel.assertQueue(queueName, { durable: true });

  console.log(`waiting for messages in queue: ${queueName}`);

  channel.consume(
    queueName,
    message => {
      const secs = message.content.toString().split('.').length - 1;

      console.log(`[x] Received: ${message.content.toString()}`);

      setTimeout(() => {
        console.log('The task is complete!');
      }, secs * 1000);
    },
    { noAck: true },
  );
};

consumeTask();
