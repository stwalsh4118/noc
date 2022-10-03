import create from "zustand";
import { Vector3 } from "three";

//NOTES ON ZUSTAND
//GETTING A CONST AS A STATE IS NOT A GOOD IDEA, IT WILL NOT UPDATE
//	eg const state = useStore.getState().state
//	state will not update correctly
//	can just get the state from store whenever you need it, but probably not performant

export const usePlayerPosition = create(() => ({
	playerPosition: new Vector3(0, 0, 0),
}));

export const useMenuStatus = create(() => ({
	inMenu: false,
}));
