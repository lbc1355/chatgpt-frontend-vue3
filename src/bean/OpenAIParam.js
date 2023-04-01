export const openAIParam = (messages) => {
  return {
    stream: true,
    model: 'gpt-3.5-turbo',
    messages: messages.map((message) => {
      return {
        role: message.role,
        content: message.content
      }
    })
  }
}
