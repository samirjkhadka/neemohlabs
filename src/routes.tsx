import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import HeroSection from "./components/HeroSection";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HeroSection />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
