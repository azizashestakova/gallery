import { Route, Routes } from "react-router-dom"
import { Layout } from "@/components/Layout"
import { Artists } from "@/components/Artists"
import { Artist } from "@/components/Artist"

export const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Artists />} />
      <Route path="/artists/:id" element={<Artist />} />
    </Route>
  </Routes>
)
