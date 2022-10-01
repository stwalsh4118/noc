import { Vector3 } from "three";
import RandomWalker from "../../components/INTRODUCTION/RandomWalker";
import Plane from "../../components/util/Plane";

function RandomWalkerScene() {
	return (
		<>
			<RandomWalker position={new Vector3(0, 0, 0)} stepTime={0.1} walkType="montecarlo"></RandomWalker>
			<Plane></Plane>
		</>
	);
}

export default RandomWalkerScene;
