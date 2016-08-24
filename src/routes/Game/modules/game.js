import Rx from 'rxjs';
// import BABYLON from 'babylonjs/babylon';
// const BJS = BABYLON;  // external dependency

// ------------------------------------
// Constants
// ------------------------------------
export const GAME_BGCOLOURIZE = 'GAME_BGCOLOURIZE';

// ------------------------------------
// Actions
// ------------------------------------
export function bgColourize(value = 1) {
  return {
    type: GAME_BGCOLOURIZE,
    payload: value
  };
}

export const actions = {
  bgColourize
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GAME_BGCOLOURIZE]: (state, action) => {
    // generate random rgb colours for scene background
    const red = Math.random();
    const green = Math.random();
    const blue = Math.random();
    // state.scene.clearColor = new BABYLON.Color4(red, green, blue);

    // set new state
    const newState = state;
    newState.bgcolour += action.payload;
    return newState;
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  bgColour: 1,
  scene: null
};
export default function gameReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
