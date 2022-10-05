import React, { createContext, useEffect, useState } from "react";
import ReactDropdown from "react-dropdown";

// CONTEXTS MUST BE CONSUMED IN THE COMPONENT THAT IS RENDERING THE CANVAS THEN PASSED DOWN TO THE COMPONENTS THAT NEED IT FOR SOME REASION
export const sceneContext = createContext("MainScene");
export const sceneDispatchContext = createContext((scene: string) => {});

function App({ children }) {
	const [scene, setScene] = useState("Sandbox");

	useEffect(() => {
		console.log("scene in context", scene);
	}, [scene]);
	return (
		// CONTEXT PROVIDERS
		<>
			<sceneContext.Provider value={scene}>
				<sceneDispatchContext.Provider value={setScene}>{children}</sceneDispatchContext.Provider>
			</sceneContext.Provider>
		</>
	);
}

export default App;
