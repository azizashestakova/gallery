import { FC, Reducer, useReducer, useEffect } from "react"
import cn from "classnames/bind"

import { SnackBar as SnackBarConsta } from "@consta/uikit/SnackBar"
import { Text } from "@consta/uikit/Text"

import { useAppDispatch, useAppSelector } from "@/app/hooks"
import ErrorIcon from "@/assets/error.svg"
import { deleteNotification } from "@/features/notification/notificationSlice"
import { IconCustom } from "@/utils/icon"

import type { Item } from "./types"

import styles from "./Snackbar.module.scss"

const cx = cn.bind(styles)

const reducer = (
  state: Item[],
  action: { type: "add" | "remove"; item: Item },
): Item[] => {
  if (action.type === "add") {
    return [...state, action.item]
  }

  return state.filter((itemInState) => itemInState.key !== action.item.key)
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

  const generateError = () => {
    const key = items.length + 1
    const item: Item = {
      key,
      title: "Error!",
      text: message ? message : "",
      status: "alert",
    }
    dispatchItems({ type: "add", item })
  }

  const deleteMessage = (item: Item) => {
    dispatchItems({ type: "remove", item })
    dispatch(deleteNotification())
  }

  useEffect(() => {
    if (message) {
      generateError()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message])

  return (
    <SnackBarConsta
      className={cx("snackBar")}
      items={items}
      onItemClose={(item) => deleteMessage(item)}
      getItemIcon={getItemIcon}
      getItemMessage={getItemMessage}
      getItemAutoClose={() => 5}
    />
  )
}
