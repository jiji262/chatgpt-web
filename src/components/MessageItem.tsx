import type { Accessor, Setter } from "solid-js"
import type { ChatMessage } from "../types"
import MarkdownIt from "markdown-it"
// @ts-ignore
import mdKatex from "markdown-it-katex"
import mdHighlight from "markdown-it-highlightjs"
import mdKbd from "markdown-it-kbd"
import MessageAction from "./MessageAction"
import { preWrapperPlugin } from "../markdown"
import "../styles/message.css"
import "../styles/clipboard.css"
import { useCopyCode } from "../hooks"
import { copyToClipboard } from "~/utils"

interface Props {
  role: ChatMessage["role"]
  message: string
  index?: number
  setInputContent?: Setter<string>
  setMessageList?: Setter<ChatMessage[]>
}

export default (props: Props) => {
  useCopyCode()
  const roleClass = {
    system: "bg-white",
    user: "",
    assistant: "bg-white"
  }

  const md = MarkdownIt({
    linkify: true,
    breaks: true
  })
    .use(mdKatex)
    .use(mdHighlight, {
      inline: true
    })
    .use(mdKbd)
    .use(preWrapperPlugin)

  function copy() {
    copyToClipboard(props.message)
  }

  function edit() {
    props.setInputContent && props.setInputContent(props.message)
  }

  function del() {
    if (props.setMessageList && props.index !== undefined) {
      props.setMessageList(list => {
        if (list[props.index!]?.role === "user") {
          const arr = list.reduce(
            (acc, cur, i) => {
              if (cur.role === "assistant" && i === acc.at(-1)! + 1) acc.push(i)
              return acc
            },
            [props.index] as number[]
          )

          return list.filter((_, i) => {
            return !arr.includes(i)
          })
        }
        return list.filter((_, i) => i !== props.index)
      })
    }
  }

  return (
    <div
      class="group flex py-2 gap-3 px-4 transition-colors dark:md:hover:border relative message-item"
      classList={{
        temporary: props.index === undefined
      }}
    >
      <div
        class={`shrink-0 w-7 h-7 mt-4 rounded-full ${
          roleClass[props.role]
        }`}
      ></div>
      <div
        class="message prose prose-white text-white break-words overflow-hidden"
        innerHTML={md.render(props.message)}
      />
      <MessageAction
        del={del}
        copy={copy}
        edit={edit}
        hidden={props.index === undefined}
      />
    </div>
  )
}
