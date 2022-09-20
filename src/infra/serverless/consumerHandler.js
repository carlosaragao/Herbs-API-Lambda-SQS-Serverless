
const observarFila = (event, context, callback) => {
  console.log(`PEGOU O EVENTO - ${JSON.stringify(event)}`)
  context.done(null, '')
}

module.exports = observarFila
module.exports.observarFila = observarFila