import { connect } from 'amqplib';

async function run() {
  try {
    const connection = await connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertExchange('test', 'topic', { durable: true });
    const replyQueue = await channel.assertQueue('', { exclusive: true });
    channel.consume(replyQueue.queue, (message) => {
      console.log(message?.content.toString());
      console.log(message?.properties.correlationId);
    });
    channel.publish(
      'test',
      'my.command',
      Buffer.from('Works!'),
      { replyTo: replyQueue.queue, correlationId: '1' },
    );
  } catch (error) {
    console.log(error)
  }
}

run();
