import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index'
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css'
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'

// highlightjs
import hljs from 'highlight.js'
VMdPreview.use(githubTheme, {
  Hljs: hljs
})

// 行号插件
// VMdPreview.use(createLineNumbertPlugin())
// 可复制插件
VMdPreview.use(createCopyCodePlugin())
export default VMdPreview
