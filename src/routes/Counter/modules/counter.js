import Rx from 'rxjs';

// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT';
export const DOUBLE_ASYNC_PENDING = 'DOUBLE_ASYNC_PENDING';
export const DOUBLE_ASYNC_ABORTED = 'DOUBLE_ASYNC_ABORTED';

// ------------------------------------
// Actions
// ------------------------------------
export function increment(value = 1) {
  return {
    type: COUNTER_INCREMENT,
    payload: value
  };
}


export const doubleAsync = () =>
  (actions, store) =>
    Rx.Observable.of(increment(store.getState().counter))
      .delay(500)
      .takeUntil(actions.ofType(DOUBLE_ASYNC_ABORTED))
      .startWith({ type: DOUBLE_ASYNC_PENDING });


export const actions = {
  increment,
  doubleAsync
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [COUNTER_INCREMENT]: (state, action) => {
    const newState = state + action.payload;
    return newState;
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 5;
export default function counterReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
