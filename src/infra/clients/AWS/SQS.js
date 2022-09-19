const { Err, Ok } = require('@herbsjs/herbs')

const dependencies = {
  SQS: require("aws-SDK").SQS,
};

class AwsSQSClient {
  constructor(injection) {
    this._di = { ...dependencies, ...injection };
    this._sqs = new this._di.SQS();
  }

  async addMessage(body, URL) {
    const params = {
      MessageBody: JSON.stringify(body),
      QueueUrl: URL,
    };
    const request = await this._sqs.sendMessage(params);
    const result = await request.promise();
    if (result.MessageId) return Ok(result.MessageId);
    console.log(result);
    return Err(result);
  }
}

module.exports = AwsSQSClient;
