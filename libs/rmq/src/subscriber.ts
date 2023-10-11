import { connect } from 'amqplib';

async function run() {
  try {
    const connection = await connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertExchange('test', 'topic', { durable: true });
    const queue = await channel.assertQueue('my-cool-queue', { durable: true });
    channel.bindQueue(queue.queue, 'test', 'my.command');
    channel.consume(queue.queue, (message) => {
      if (!message) {
        return;
      }

      console.log(message.content.toString());
      if (message.properties.replyTo) {
        console.log(message.properties.replyTo);
        channel.sendToQueue(
          message.properties.replyTo,
          Buffer.from('Answer'),
          { correlationId: message.properties.correlationId },
        );
      }
    }, { noAck: true });
  } catch (error) {
    console.log(error);
  }
}

run();
