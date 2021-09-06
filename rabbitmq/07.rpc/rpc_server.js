const amqp = require('amqplib');

const queueName = 'rpc_queue';

function fibonacci(num) {
  if (num === 0 || num === 1) {
    return num;
  } else {
    return fibonacci(num - 1) + fibonacci(num - 2);
  }
}

const processTask = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queue = await channel.assertQueue(queueName, { durable: false });

  channel.prefetch(1);

  console.log('[x] Awaiting RPC requests.');

  channel.consume(
    queueName,
    message => {
      const num = parseInt(message.content.toString());

      const result = fibonacci(num);

      console.log('[x] Sending result: ', result);

      channel.sendToQueue(
        message.properties.replyTo,
        Buffer.from(result.toString()),
        { correlationId: message.properties.correlationId },
      );

      channel.ack(message);
    },
    { noAck: false },
  );
};

processTask();
