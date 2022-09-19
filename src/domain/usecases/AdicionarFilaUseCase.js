const { usecase, step, Ok } = require("@herbsjs/herbs");

const dependency = {
  QueueService: new (require('../../infra/services/QueueService')),
}

const AdicionarFilaUseCase = (injection) =>
  usecase("Adicionar mensagem à fila", {
    request: {
      body: String,
      filaUrl: String,
    },

    setup: (ctx) => (ctx.di = Object.assign({}, dependency, injection)),

    "Envia mensagem para fila": step(async (ctx) => {
      const { body, filaUrl } = ctx.req
      const resultadoEnvioMensagem = await ctx.di.QueueService.adicionarMensagem(body, filaUrl)
      ctx.ret = resultadoEnvioMensagem.value
      return Ok();
    }),
  });

module.exports = AdicionarFilaUseCase
module.exports.AdicionarFilaUseCase = AdicionarFilaUseCase
