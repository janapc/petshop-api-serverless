const { SendMessageCommand } = require("@aws-sdk/client-sqs");
const { randomUUID } = require("crypto");

const { getQueueUrl } = require("./getQueueUrl");
const { Log } = require("../../utils");

class Producer {
  #client;
  constructor(client) {
    this.#client = client;
  }

  async sendMessage({ message, groupId, queueName }) {
    const queueUrl = await getQueueUrl(this.#client, queueName);
    try {
      const input = {
        QueueUrl: queueUrl,
        MessageBody: message,
        DelaySeconds: 0,
        MessageDeduplicationId: randomUUID(),
        MessageGroupId: groupId,
      };
      const command = new SendMessageCommand(input);
      const response = await this.#client.send(command);
      return response;
    } catch (error) {
      Log.error("ErrorProducer", error.message);
    }
  }
}

module.exports = Producer;
