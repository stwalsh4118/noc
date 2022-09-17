import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import SceneManager from "./components/util/SceneManager";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<App>
			<SceneManager></SceneManager>
		</App>
	</React.StrictMode>
);
