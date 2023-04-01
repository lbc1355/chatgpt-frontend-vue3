/* eslint-disable no-control-regex */
export const countChars = (str) => {
  let chineseChars = 0
  let chineseWords = 0
  let englishChars = 0
  let englishWords = 0
  const regex = /[\u4e00-\u9fa5]/
  for (let i = 0; i < str.length; i++) {
    const char = str.charAt(i)
    if (regex.test(char)) {
      chineseChars++
      if (i < str.length - 1 && !regex.test(str.charAt(i + 1))) {
        chineseWords++
      }
    } else if (/[a-zA-Z]/.test(char)) {
      englishChars++
      if (i < str.length - 1 && !/[a-zA-Z]/.test(str.charAt(i + 1))) {
        englishWords++
      }
    }
  }
  return {
    chineseChars,
    chineseWords,
    englishChars,
    englishWords
  }
}

export const currentDate = () => {
  // 创建Date对象
  const date = new Date()
  // 获取年份
  const year = date.getFullYear()
  // 获取月份，需要注意月份从0开始计数，所以要加1
  const month = date.getMonth() + 1
  // 获取日数
  const day = date.getDate()
  // 获取小时数
  const hour = date.getHours()
  // 获取分钟数
  const minute = date.getMinutes()
  // 拼接字符串，需要补0
  const formattedDate = `${year} ${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
  // 输出结果
  return formattedDate
}
