const amqp = require('amqplib');

const exchangeName = 'header_logs';
const args = process.argv.slice(2);
const message = args[0] || 'New log with headers.';

const emitLog = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertExchange(exchangeName, 'headers', { durable: false });

  channel.publish(exchangeName, '', Buffer.from(message), {
    headers: { account: 'new', method: 'facebook' },
  });
  console.log('Sent: ', message);

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
};

emitLog();
