import { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "./Partials/ErrorBoundary";
import Footer from "./Partials/Footer";
import Header from "./Partials/Header";
import { store } from "./redux/store";
import { PrivateRoutes, PublicRoutes } from "./routes";
import { RouteConfig } from "./routes/Interface/interface";
import axios from 'axios'
const App: React.FC = () => {
	const token = sessionStorage.getItem("token");

	useEffect(() => {
	  const handleTabClosed = async () => {
		// Make sure to only trigger the logout request if the token exists (user is logged in)
		if (token) {
		  try {
			await axios.get(`${process.env.REACT_APP_BASE_URL}/users/logout`, {
			  headers: {
				Authorization: `Bearer ${token}`,
			  },
			});
		  } catch (error) {
			console.error("Error logging out:", error);
		  }
		}
	  };
  
	  window.addEventListener('unload', handleTabClosed);
  
	  return () => {
		// Clean up the event listener when the component is unmounted
		window.removeEventListener('unload', handleTabClosed);
	  };
	}, [token]);
	return (
		<ErrorBoundary>
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
		</ErrorBoundary>
	);
}

export default App;
