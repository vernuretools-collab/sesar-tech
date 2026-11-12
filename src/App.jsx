import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Industries from "./pages/Industries";
import NotFound from "./pages/NotFound";
import Rent from "./pages/Rent";
import Sales from "./pages/Sales";
import Service from "./pages/Service";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="sales" element={<Sales />} />
          <Route path="service" element={<Service />} />
          <Route path="rent" element={<Rent />} />
          <Route path="industries" element={<Industries />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
