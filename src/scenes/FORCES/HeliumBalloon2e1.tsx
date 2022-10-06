import { Vector3 } from "three";
import HeliumBalloon from "../../components/FORCES/HeliumBalloon";
import Plane from "../../components/util/Plane";

function HeliumBalloon2e1() {
	return (
		<>
			<HeliumBalloon></HeliumBalloon>
			<Plane></Plane>
			<mesh position={new Vector3(0, 25.5, 0)}>
				<boxGeometry args={[10, 0.1, 10]}></boxGeometry>
				<meshStandardMaterial color="red"></meshStandardMaterial>
			</mesh>
		</>
	);
}

export default HeliumBalloon2e1;
