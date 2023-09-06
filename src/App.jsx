import { Route, Routes } from "react-router-dom";
import { IndexPage } from "./pages/index-page";
import { NotFound } from "./pages/not-found";
import { Header } from "./components/header";
import { BottomNavBar } from "./components/bottom-navbar";

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<IndexPage />} />

				{/* SIEMPRE AL FINAL */}
				<Route path="*" element={<NotFound />} />
			</Routes>
			<BottomNavBar />
		</>
	);
}

export default App;
