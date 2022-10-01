import React, { useContext } from "react";
import { sceneContext } from "../../App";
import BaseScene from "../../scenes/BaseScene";

import RandomWalkerScene from "../../scenes/INTRODUCTION/RandomWalkerScene";
import VectorBallBounce1e1 from "../../scenes/VECTORS/VectorBallBounce1e1";

const scenes = {
	RandomWalkerScene: RandomWalkerScene,
	VectorBallBounce1e1: VectorBallBounce1e1,
};

function SceneManager() {
	const scene = useContext(sceneContext);

	//CREATE SCENE FROM NAME THATS IN SCENE CONTEXT
	return (
		<>
			<BaseScene>{React.createElement(scenes[scene])}</BaseScene>
		</>
	);
}

export default SceneManager;
