const Producer = require("../../service/sqs/Producer");
const sqsClient = require("../../service/sqs/sqsClient");
const { Log } = require("../../utils");

module.exports.handler = async (event) => {
  try {
    const { email, pet } = JSON.parse(event.Records[0].body);
    const clientSqs = sqsClient();
    const producer = new Producer(clientSqs);
    const msg = {
      to: email,
      subject: "Register fail",
      text: `unregistered pet ${pet.identifyNumberCustomer} - ${pet.name}`,
    };
    await producer.sendMessage({
      message: JSON.stringify(msg),
      queueName: process.env.SQS_QUEUE_SEND_EMAIL_NAME,
      groupId: "send-email",
    });
  } catch (error) {
    Log.error("handlerErrorDLQ", error.message);
  }
};
