const amqp = require('amqplib');

const exchangeName = 'header_logs';

const receiveLog = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertExchange(exchangeName, 'headers', { durable: false });

  const queue = await channel.assertQueue('', { exclusive: true });
  console.log('Waiting for logs in queue: ', queue.queue);

  channel.bindQueue(queue.queue, exchangeName, '', {
    account: 'new',
    method: 'facebook',
    'x-match': 'any', // condition for matching: any == or, all == and
  });

  channel.consume(
    queue.queue,
    log => {
      if (log.content) {
        console.log(
          `Routing key: ${JSON.stringify(log.properties.headers)}, Message: ${
            log.content
          }`,
        );
      }
    },
    { noAck: true },
  );
};

receiveLog();
