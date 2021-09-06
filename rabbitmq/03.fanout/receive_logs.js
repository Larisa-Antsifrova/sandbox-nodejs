const amqp = require('amqplib');

const exchangeName = 'logs';

const receiveLog = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  await channel.assertExchange(exchangeName, 'fanout', { durable: false });
  const queue = await channel.assertQueue('', { exclusive: true });

  console.log('Wating for the logs in queue: ', queue.queue);

  channel.bindQueue(queue.queue, exchangeName, '');

  channel.consume(
    queue.queue,
    log => {
      if (log.content) {
        console.log(`Here comes the log: ${log.content.toString()}`);
      }
    },
    { noAck: true },
  );
};

receiveLog();
