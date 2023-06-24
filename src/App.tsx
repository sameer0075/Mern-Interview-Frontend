import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Partials/Footer";
import Header from "./Partials/Header";
import { PrivateRoutes, PublicRoutes } from "./routes";
import { RouteConfig } from "./routes/Interface/interface";
function App() {
	const token = sessionStorage.getItem("token");
	return (
		<div className="App">
			<BrowserRouter>
				{!token && <Header />}
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
				{!token && <Footer />}
			</BrowserRouter>
		</div>
	);
}

export default App;
