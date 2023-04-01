import { ref } from 'vue'
// eslint-disable-next-line no-unused-vars
export class Scrollerbar {
    bar = null
    wipeUp = false
    currentLocation = { scrollTop: 0, scrollLeft: 0 }

    constructor () {
      this.bar = ref()
    }

    scrollToEnd () {
      if (!this.wipeUp) {
        this.bar.value.scrollTo(0, this.bar.value.wrapRef.scrollHeight)
      }
    }

    iswipeUp (location) {
      if (this.currentLocation.scrollTop > location.scrollTop) {
        this.wipeUp = true
      }
      // 如果用户滑到底部
      if (location.scrollTop === this.bar.value.wrapRef.scrollHeight) {
        this.wipeUp = false
      }
      this.currentLocation = location
    }
}
