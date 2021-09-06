const amqp = require('amqplib');
const { v4: uuid } = require('uuid');

const args = process.argv.slice(2);

if (!args.length) {
  console.log('Use: rpc_client.js number');
  process.exit(1);
}

const num = parseInt(args[0]);
const id = uuid();

const getFib = async (num, id) => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queue = await channel.assertQueue('', { exclusive: true });

  console.log('[x] Requesting fib(%d).', num);

  channel.sendToQueue('rpc_queue', Buffer.from(num.toString()), {
    replyTo: queue.queue,
    correlationId: id,
  });

  channel.consume(
    queue.queue,
    message => {
      if (message.properties.correlationId === id) {
        console.log('[.] Got %s: ', message.content.toString());
        setTimeout(() => {
          connection.close();
          process.exit(0);
        }, 500);
      }
    },
    { noAck: true },
  );

  console.log('[x] Sent: ', num);
};

getFib(num, id);
