import { Route, Routes } from "react-router-dom";
import { IndexPage } from "./pages/index-page";
import { NotFound } from "./pages/not-found";
import { Header } from "./components/header";
import { BottomNavBar } from "./components/bottom-navbar";
import { NewUserPage } from "./pages/new-user";
import { ValidateUserPage } from "./pages/validation-page";
import { LoginUserPage } from "./pages/login-page";
import { AuthContextProvider } from "./contexts/auth-context";
import { PasswordResetRequest } from "./pages/recovery-password";
import { ChangePassword } from "./pages/change-password";
import { Toaster } from "sonner";
import { ModifyUserPage } from "./pages/modify-user";
import { UserPage } from "./pages/user-page";
import { ProductPage } from "./pages/product_page";
import { CategoryPage } from "./pages/category-page";
import { NewProduct } from "./pages/new-product-page";
import { OrderProductPage } from "./pages/order-product-page";
import { OrdersPage } from "./pages/user-orders-page";
import { OffersPage } from "./pages/user-offers-page";
import { OrdersWithoutRate } from "./pages/order-without-rate-page";
import { RateOrder } from "./pages/rate-order-page";
import { SearchPage } from "./pages/search-page";

function App() {
	return (
		<AuthContextProvider>
			<Toaster richColors position="top-center" />
			<Header />
			<Routes>
				<Route index element={<IndexPage />} />
				<Route path="/login" element={<LoginUserPage />} />
				<Route path="/register" element={<NewUserPage />} />
				<Route path="/users/">
					<Route path=":username" element={<UserPage />} />
					<Route path=":username/orders" element={<OrdersPage />} />
					<Route path=":username/orders/rate" element={<OrdersWithoutRate />} />
					<Route
						path=":username/orders/rate/:orderId"
						element={<RateOrder />}
					/>
					<Route path=":username/offers" element={<OffersPage />} />
					<Route path="validate" element={<ValidateUserPage />} />
					<Route path="update" element={<ModifyUserPage />} />
					<Route path="recovery-password" element={<PasswordResetRequest />} />
					<Route path="change-password" element={<ChangePassword />} />
					<Route path="alerts" element />
				</Route>
				<Route path="/products">
					<Route path=":product_id" element={<ProductPage />} />
					<Route path=":product_id/order" element={<OrderProductPage />} />
					<Route path="new" element={<NewProduct />} />
				</Route>
				<Route path="/category">
					<Route path=":category" element={<CategoryPage />} />
				</Route>
				<Route path="/search" element={<SearchPage />} />

				{/* SIEMPRE AL FINAL */}
				<Route path="*" element={<NotFound />} />
				{/* SIEMPRE AL FINAL */}
			</Routes>
			<BottomNavBar />
		</AuthContextProvider>
	);
}

export default App;
