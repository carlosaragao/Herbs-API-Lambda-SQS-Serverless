module.exports = async (event, context) => {
  for (const { body } of event.Records) {
    console.log(JSON.parse(body))
  }
}
