import { Route, Routes } from "react-router-dom";
import { IndexPage } from "./pages/index-page";
import { NotFound } from "./pages/not-found";
import { Header } from "./components/header";
import { BottomNavBar } from "./components/bottom-navbar";
import NewUserPage from "./pages/new-user";
import ValidateUserPage from "./pages/validation-page";
import { LoginUserPage } from "./pages/login-page";
import { AuthContextProvider } from "./contexts/auth-context";

function App() {
	return (
		<AuthContextProvider>
			<Header />
			<Routes>
				<Route path="/" element={<IndexPage />} />
				<Route path="/login" element={<LoginUserPage />} />
				<Route path="/create-account" element={<NewUserPage />} />
				<Route path="/users/validate" element={<ValidateUserPage />} />

				{/* SIEMPRE AL FINAL */}
				<Route path="*" element={<NotFound />} />
				{/* SIEMPRE AL FINAL */}
			</Routes>
			<BottomNavBar />
		</AuthContextProvider>
	);
}

export default App;
