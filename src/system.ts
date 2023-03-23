export const setting = {
  continuousDialogue: false,
  archiveSession: true,
  openaiAPIKey: "",
  openaiAPITemperature: 60,
  password: "",
  systemRule: ""
}

export const message = `- 由 [OpenAI API](https://platform.openai.com/docs/guides/chat) 提供支持。
- [[Shift]] + [[Enter]] 换行，开头输入 [[/]] 或者 [[空格]] 搜索 Prompt 预设，点击输入框滚动到底部。
- 为了节省token消耗，默认不开启连续对话功能。
- 当前没有给网站设置密码，请勿滥用。`

export type Setting = typeof setting

export const resetContinuousDialogue = true
