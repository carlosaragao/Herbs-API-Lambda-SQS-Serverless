const dependencies = {
  SQS: require('../clients/AWS/SQS')
}

class QueueService {
  constructor(injection) {
    const di = Object.assign({}, dependencies, injection)
    this._sqsClient = new di.SQS()
  }

  async adicionarMensagem(mensagem, queueUrl) {
    return await this._sqsClient.addMessage(mensagem, queueUrl)
  }
}

module.exports = QueueService
module.exports.QueueService = QueueService