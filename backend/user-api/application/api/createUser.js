const User = require("../../domain/User");
const { bodyHandler, formatResponse, Log } = require("../../utils");
const userRepository = require("../../infra/database/repository");
const connection = require("../../infra/database/connect");
const sqsClient = require("../../service/sqs/sqsClient");
const Producer = require("../../service/sqs/Producer");

async function sendEmail(emailUser) {
  const clientSqs = sqsClient();
  const producer = new Producer(clientSqs);
  const msg = {
    to: emailUser,
    subject: "Welcome to Petshop",
    text: "Your email has been created successfully",
  };
  await producer.sendMessage({
    message: JSON.stringify(msg),
    queueName: process.env.SQS_QUEUE_SEND_EMAIL_NAME,
    groupId: "send-email",
  });
}

module.exports.handler = async (event) => {
  try {
    const body = bodyHandler(event);
    const user = new User(body);
    const repository = userRepository(connection);
    await repository.create(user);
    await sendEmail(user.email);
    return formatResponse({
      statusCode: 201,
    });
  } catch (error) {
    Log.error("createUser", error.message);
    return formatResponse({
      statusCode: error.code || 500,
      body: {
        error: error.code
          ? error.message
          : "internal server error, try again later",
      },
    });
  }
};
