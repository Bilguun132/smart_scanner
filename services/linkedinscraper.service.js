var amqp = require("amqplib/callback_api");

const CONN_URL = process.env.MQ_URL
console.log(CONN_URL)

let ch = null;
amqp.connect(CONN_URL, function (err, conn) {
   conn.createChannel(function (err, channel) {
      console.log(err)
      ch = channel;
   });
});

const publishToQueue = async (queueName, data) => {
   ch.assertQueue(queueName, {
      durable: false
    });
   ch.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
   console.log(" [x] Sent %s", data);
}

process.on('exit', (code) => {
   ch.close();
   console.log(`Closing rabbitmq channel`);
});

module.exports.publishToQueue = publishToQueue