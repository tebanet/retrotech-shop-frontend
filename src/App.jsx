import { Route, Routes } from "react-router-dom";
import { IndexPage } from "./pages/index-page";
import { NotFound } from "./pages/not-found";
import { Header } from "./components/header";
import { BottomNavBar } from "./components/bottom-navbar";
import { NewUserPage } from "./pages/new-user";
import { ValidateUserPage } from "./pages/validation-page";
import { LoginUserPage } from "./pages/login-page";
import { AuthContextProvider } from "./contexts/auth-context";
import PasswordResetRequest from "./pages/recovery-password";
import ChangePassword from "./pages/change-password";
import { Toaster } from "sonner";
import ModifyUserPage from "./pages/modify-user";

function App() {
  return (
    <AuthContextProvider>
      <Toaster richColors position="top-center" />
      <Header />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<LoginUserPage />} />
        <Route path="/register" element={<NewUserPage />} />
        <Route path="/users/validate" element={<ValidateUserPage />} />
        <Route path="/users/update" element={<ModifyUserPage />} />
        <Route
          path="/users/recovery-password"
          element={<PasswordResetRequest />}
        />
        <Route path="/users/change-password" element={<ChangePassword />} />

        {/* SIEMPRE AL FINAL */}
        <Route path="*" element={<NotFound />} />
        {/* SIEMPRE AL FINAL */}
      </Routes>
      <BottomNavBar />
    </AuthContextProvider>
  );
}

export default App;
