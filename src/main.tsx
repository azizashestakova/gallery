import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"

import { store } from "@/app/store"
import { FilterProvider } from "@/context/FilterProvider"

import { App } from "./App"

import "./styles/index.scss"

ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement).render(
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
