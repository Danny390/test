import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSignupForm from "./components/LoginSignupForm/LoginSignupForm";
import Home from "./components/Home/Home";
import store from "./context/store";
import { Provider } from "react-redux";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<LoginSignupForm />} />
					<Route path="/home" element={<Home />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
}

serviceWorkerRegistration.register();
export default App;
