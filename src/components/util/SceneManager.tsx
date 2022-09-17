import React, { useContext } from "react";
import { sceneContext } from "../../App";

import MainScene from "../../scenes/MainScene";
import RandomWalkerScene from "../../scenes/INTRODUCTION/RandomWalkerScene";

const scenes = {
	MainScene: MainScene,
	RandomWalkerScene: RandomWalkerScene,
};

function SceneManager() {
	const scene = useContext(sceneContext);

	return React.createElement(scenes[scene]);
}

export default SceneManager;
