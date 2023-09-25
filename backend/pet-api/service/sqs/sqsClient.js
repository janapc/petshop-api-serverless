const { SQSClient } = require("@aws-sdk/client-sqs");

module.exports = () => {
  const config = {
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.SQS_QUEUE_ACCESSKEY,
      secretAccessKey: process.env.SQS_QUEUE_SECRETKEY,
    },
    endpoint: process.env.SQS_QUEUE_ENDPOINT,
  };
  return new SQSClient(config);
};
