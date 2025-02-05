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
	<GoogleOAuthProvider clientId="11346340118-93mcfmd8lug0dkup3qu4rrv5pn2at8gj.apps.googleusercontent.com">
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
