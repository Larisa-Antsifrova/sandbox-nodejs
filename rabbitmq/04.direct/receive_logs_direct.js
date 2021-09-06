const amqp = require('amqplib');

const args = process.argv.slice(2);

if (!args.length) {
  console.log('Please provide type of logs: [info] [warning] [error]');
  process.exit(1);
}

const exchangeName = 'direct_logs';

const receiveLog = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  await channel.assertExchange(exchangeName, 'direct', { durable: false });
  const queue = await channel.assertQueue('', { exclusive: true });

  console.log('Wating for the logs in queue: ', queue.queue);

  args.forEach(logsType => {
    channel.bindQueue(queue.queue, exchangeName, logsType);
  });

  channel.consume(
    queue.queue,
    log => {
      if (log.content) {
        console.log(
          `Routing key: ${
            log.fields.routingKey
          }, Message: ${log.content.toString()}`,
        );
      }
    },
    { noAck: true },
  );
};

receiveLog();
