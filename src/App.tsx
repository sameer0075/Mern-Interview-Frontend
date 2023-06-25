import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Partials/Footer";
import Header from "./Partials/Header";
import { store } from "./redux/store";
import { PrivateRoutes, PublicRoutes } from "./routes";
import { RouteConfig } from "./routes/Interface/interface";
function App() {
	const token = sessionStorage.getItem("token");
	return (
		<div className="App">
			<Provider store={store}>
				<ToastContainer />
				<BrowserRouter>
					{token && <Header />}
					<Routes>
						{!token
							? PublicRoutes.map(
									({ component, path }: RouteConfig, index: number) => (
										<Route key={index} path={path} element={component} />
									)
							  )
							: PrivateRoutes.map(
									({ component, path }: RouteConfig, index: number) => (
										<Route key={index} path={path} element={component} />
									)
							  )}
					</Routes>
					{token && <Footer />}
				</BrowserRouter>
			</Provider>
		</div>
	);
}

export default App;
