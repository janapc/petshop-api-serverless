const { GetQueueUrlCommand } = require("@aws-sdk/client-sqs");

module.exports.getQueueUrl = async (client, queueName) => {
  const input = {
    QueueName: queueName,
  };
  const command = new GetQueueUrlCommand(input);
  const result = await client.send(command);
  return result.QueueUrl;
};
