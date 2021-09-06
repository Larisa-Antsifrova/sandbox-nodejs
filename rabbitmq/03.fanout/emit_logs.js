const amqp = require('amqplib');

const exchangeName = 'logs';
const message = process.argv.slice(2).join(' ') || 'New log';

const emitLog = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  await channel.assertExchange(exchangeName, 'fanout', { durable: false });

  channel.publish(exchangeName, '', Buffer.from(message));

  console.log('Sending the message to the exchange. Exciting!');

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
};

emitLog();
