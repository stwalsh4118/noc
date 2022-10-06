import React, { useContext } from "react";
import { sceneContext, sceneDispatchContext } from "../../App";
import BaseScene from "../../scenes/BaseScene";

import RandomWalkerScene from "../../scenes/INTRODUCTION/RandomWalkerScene";
import AccelerateBallsTowardsPlayer1e2 from "../../scenes/VECTORS/AccelerateBallsTowardsPlayer1e2";
import VectorBallBounce1e1 from "../../scenes/VECTORS/VectorBallBounce1e1";
import Sandbox from "../../scenes/THE ENVIRONNMENT PROJECT/Sandbox";
import ReactDropdown from "react-dropdown";
import { useMenuStatus } from "../../globals";
import TEST from "../../scenes/TEST";
import HeliumBalloon2e1 from "../../scenes/FORCES/HeliumBalloon2e1";

const scenes = {
	RandomWalkerScene: RandomWalkerScene,
	VectorBallBounce1e1: VectorBallBounce1e1,
	AccelerateBallsTowardsPlayer1e2: AccelerateBallsTowardsPlayer1e2,
	Sandbox: Sandbox,
	TEST: TEST,
	HeliumBalloon2e1: HeliumBalloon2e1,
};

function SceneManager() {
	const scene = useContext(sceneContext);
	const changeScene = useContext(sceneDispatchContext);

	//CREATE SCENE FROM NAME THATS IN SCENE CONTEXT
	return (
		<>
			<ReactDropdown
				options={Object.keys(scenes)}
				className="absolute ml-[50%] z-10 bg-slate-600/50"
				onChange={(e) => {
					console.log("CHANGING SCENES");
					useMenuStatus.setState({ inMenu: false });
					console.log("MENU STATUS AFTER CHANGING SCENES", useMenuStatus.getState().inMenu);
					changeScene(e.value);
				}}
				onFocus={(e) => {
					console.log("inMenu", !e);
					useMenuStatus.setState({ inMenu: !e });
					console.log("getting menu status", useMenuStatus.getState().inMenu);
				}}
			></ReactDropdown>
			<BaseScene>{React.createElement(scenes[scene])}</BaseScene>
		</>
	);
}

export default SceneManager;
