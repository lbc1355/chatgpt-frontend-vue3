export default {
  mounted (el) {
    updateHeight(el)
  },
  updated (el) {
    updateHeight(el)
  }
}

function updateHeight (el) {
//   el.style.height = `${el.scrollHeight}px`
//   const { scrollHeight, paddingTop, paddingBottom } = el
//   const lineHeight = parseInt(getComputedStyle(el)['line-height'])
//   const rows = Math.ceil(scrollHeight / lineHeight)
//   const height = el.parentNode.clientHeight - paddingTop - paddingBottom
//   el.style.height = `${Math.max(lineHeight * 2, height - (rows - 1) * lineHeight)}px`
}
