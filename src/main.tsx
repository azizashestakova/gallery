import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"

import { store } from "@/app/store"

import { FilterProvider } from "@/context/FilterProvider"

import { App } from "./App"

import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <FilterProvider>
          <App />
        </FilterProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
