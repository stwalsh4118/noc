import create from "zustand";
import { Vector3 } from "three";

export const usePlayerPosition = create(() => ({
	playerPosition: new Vector3(0, 0, 0),
}));
