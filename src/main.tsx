import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";

import App from "./App.tsx";

import NotFound from "./feature/page/not-found.tsx";
import ResetPasswordDisplay from "./feature/login/login-reset.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* 루트 */}
        <Route path="/" element={<App />} />

        {/* 재설정 */}
        <Route path="reset/password" element={<ResetPasswordDisplay />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
