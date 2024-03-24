import { Route, Routes } from "react-router-dom"

import { Artist } from "@/components/Artist"
import { Artists } from "@/components/Artists"
import { Layout } from "@/components/Layout"
import { Responses } from "@/components/Responses"

export const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Artists />} />
      <Route path="/artists/:id" element={<Artist />} />
      <Route path="*" element={<Responses />} />
    </Route>
  </Routes>
)
