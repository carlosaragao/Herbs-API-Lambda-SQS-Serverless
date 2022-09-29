const { AdicionarFilaUseCase } = require('../../domain/usecases/AdicionarFilaUseCase')
const config = require('../../config');

const dependencies = {
  fila: config.sqs.filaLambdaApi
}

module.exports = async (event) => {

  try {
    const params = {
      body: event.body,
      filaUrl: dependencies.fila.URL
    }
    const useCase = AdicionarFilaUseCase();
    const ucResultado = await useCase.run(params)
    console.log(ucResultado)
    if (ucResultado?.isErr)
      throw new Error(ucResultado)
    return {
      statusCode: 200,
      body: JSON.stringify({
        messageId: ucResultado.value
      })
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Erro - Ocorreu um erro ao enviar mensagem para fila",
        error: error.message
      })
    }
  }
};
