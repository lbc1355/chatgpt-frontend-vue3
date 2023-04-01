import MkardownIt from 'markdown-it'
const md = new MkardownIt()
export const markdownToHtml = (messages) => {
  return md.render(messages)
}
