const amqp = require('amqplib');

const exchangeName = 'direct_logs';
const args = process.argv.slice(2);
const logType = args[0];
const logMessage = args[1] || 'Default log message.';

console.log('logType', logType);
console.log('logMessage', logMessage);

const emitLog = async () => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  await channel.assertExchange(exchangeName, 'direct', { durable: false });

  channel.publish(exchangeName, logType, Buffer.from(logMessage));

  console.log(
    `Emitting log to direct exchange. Log Type: ${logType}. Log message: ${logMessage}`,
  );

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
};

emitLog();
