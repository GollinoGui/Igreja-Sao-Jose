import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Sobre } from "./pages/Sobre";
import { Missas } from "./pages/Missas";
import { Noticias } from "./pages/Noticias";
import { Contato } from "./pages/Contato";
import { Admin } from "./pages/Admin";
import { NotFound } from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/missas" element={<Missas />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
