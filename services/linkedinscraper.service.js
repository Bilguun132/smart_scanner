var amqp = require("amqplib/callback_api");

const CONN_URL = process.env.MQ_URL

let ch = null;
amqp.connect(CONN_URL, function (err, conn) {
   conn.createChannel(function (err, channel) {
      ch = channel;
   });
});

const publishToQueue = async (queueName, data) => {
   console.log(queueName)
   console.log(data)
   ch.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
   console.log(" [x] Sent %s", data);
}

process.on('exit', (code) => {
   ch.close();
   console.log(`Closing rabbitmq channel`);
});

module.exports.publishToQueue = publishToQueue