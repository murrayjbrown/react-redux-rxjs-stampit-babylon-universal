import Rx from 'rxjs';
import {babylonSceneDriverFactory} from 'scenes/BabylonScene';
import BABYLON from 'babylonjs/babylon';

// ------------------------------------
// Constants
// ------------------------------------
export const GAME_BGCOLOURIZE = 'GAME_BGCOLOURIZE';
export const GAME_REFCANVAS = 'GAME_REFCANVAS';

// ------------------------------------
// Actions
// ------------------------------------
export function bgColourize(value = 1) {
  return {
    type: GAME_BGCOLOURIZE,
    payload: value
  };
}
export function refCanvas(value = null) {
  return {
    type: GAME_REFCANVAS,
    payload: value
  };
}

export const actions = {
  bgColourize,
  refCanvas
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
    const scene = state.sceneDriver.getScene();
    scene.clearColor = new BABYLON.Color4(red, green, blue);

    // set new state
    const newState = state;
    newState.bgcolour += action.payload;
    return newState;
  },
  [GAME_REFCANVAS]: (state, action) => {
    const newState = state;

    if ( action.payload ) { // mounting canvas
      if ( !state.canvas ) {
        newState.canvas = action.payload;
        if ( !state.sceneDriver ) { // new scene driver
          newState.sceneDriver = babylonSceneDriverFactory(newState.canvas);
          newState.sceneDriver.create();
        }
        newState.sceneDriver.runRenderLoop();
      }
    } else {  // unmounting canvas
      if ( state.sceneDriver ) {
        state.sceneDriver.stopRenderLoop();
        state.sceneDriver.destroy();
        newState.sceneDriver = null;
        newState.canvas = null;
      }
    }
    return newState;
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  bgColour: 1,
  canvas: null,
  sceneDriver: null
};
//

export default function gameReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
