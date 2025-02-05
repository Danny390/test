import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<GoogleOAuthProvider
		clientId={`${process.env.REACT_APP_GOOGLE_API_CLIENT_ID}`}
	>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</GoogleOAuthProvider>
);

// Register your custom service worker
serviceWorkerRegistration.register({
	onUpdate: (registration: any) => {
		console.log("A new service worker is available.");
		// You can trigger a callback here if you want
	},
	onSuccess: (registration: any) => {
		console.log("Service worker registered successfully:", registration);
	}
});
