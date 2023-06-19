const openai = require('../config/openaiConfig')

const generateMeta = async (req, res) => {
  const question = req

  const description = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: 'user',
        content: question
      }
    ],
    max_tokens: 100
  })

  return description.data.choices[0].message.content
}

module.exports = {generateMeta}