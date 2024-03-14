import { FC, Reducer, useReducer, useEffect } from "react"
import cn from "classnames/bind"

import { SnackBar as SnackBarConsta } from "@consta/uikit/SnackBar"
import { Text } from "@consta/uikit/Text"

import { IconCustom } from "@/utils/icon"

import ErrorIcon from "@/assets/error.svg"

import { useAppDispatch, useAppSelector } from "@/app/hooks"

import { deleteNotification } from "@/features/notification/notificationSlice"

import styles from "./Snackbar.module.css"

const cx = cn.bind(styles)

type Item = {
  key: number
  title: string
  text: string
  status: string
}

const reducer = (
  state: Item[],
  action: { type: "add" | "remove"; item: Item },
): Item[] => {
  switch (action.type) {
    case "add":
      return [...state, action.item]
    case "remove":
      return state.filter((itemInState) => itemInState.key !== action.item.key)
  }
}

const getItemIcon = () => IconCustom(ErrorIcon)

const getItemMessage = (item: Item) => (
  <div>
    <Text
      view="alert"
      size="m"
      lineHeight="2xs"
      weight="medium"
      as="span"
      className={cx("title")}
    >
      {item.title}
    </Text>
    <Text view="primary" size="xs" lineHeight="2xs" weight="light" as="span">
      {item.text}
    </Text>
  </div>
)

export const SnackBar: FC = () => {
  const dispatch = useAppDispatch()

  const message = useAppSelector((state) => state.notification.message)

  const [items, dispatchItems] = useReducer<
    Reducer<Item[], { type: "add" | "remove"; item: Item }>
  >(reducer, [])

  const generateHandleAdd = (status: any) => {
    const key = items.length + 1
    const item: Item = {
      key,
      title: "Error!",
      text: message ? message : "",
      status,
    }
    dispatchItems({ type: "add", item })
  }

  const deleteMessage = (item: Item) => {
    dispatchItems({ type: "remove", item })
    dispatch(deleteNotification())
  }

  useEffect(() => {
    if (message) {
      generateHandleAdd("alert")
    }
  }, [message])

  return (
    <>
      <SnackBarConsta
        className={cx("snackBar")}
        items={items}
        onItemClose={(item) => deleteMessage(item)}
        getItemIcon={getItemIcon}
        getItemMessage={getItemMessage}
        getItemAutoClose={() => 5}
      />
    </>
  )
}
