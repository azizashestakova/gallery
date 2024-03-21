import { Route, Routes, useLocation } from "react-router-dom"

import { Artist } from "@/components/Artist"
import { Artists } from "@/components/Artists"
import { Layout } from "@/components/Layout"
import { Login } from "@/components/Login"
import { Register } from "@/components/Register"
import { Responses } from "@/components/Responses"

export const App = () => {
  const location = useLocation()
  const state = location.state as { background?: Location } // TODO:: Исправить

  return (
    <>
      <Routes location={state?.background || location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Artists />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/artists/:id" element={<Artist />} />
          <Route path="*" element={<Responses />} />
        </Route>
      </Routes>
      {state?.background && ( // TODO:: Проверить
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </>
  )
}
