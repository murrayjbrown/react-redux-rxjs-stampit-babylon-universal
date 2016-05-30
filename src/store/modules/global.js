import { LOCATION_CHANGE } from 'react-router-redux';
import * as Rx from 'rxjs';

export const START_LOADING = LOCATION_CHANGE;
export const END_LOADING = 'END_LOADING';

export const startLoading = () =>
  (dispatch) =>
    dispatch({
      type: START_LOADING,
    });

export const endLoading = (path) =>
  (actions, store) => {
    const state = store.getState();
    if (state.router.locationBeforeTransitions.pathname === path) {
      return Rx.Observable.of({
        type: END_LOADING,
      });
    }
    return {};
  };

// ------------------------------------
// Action Handlers
// ------------------------------------
export const actions = {
  endLoading,
  startLoading,
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  loading: false,
};
export default function globalReducer(state = initialState, action) {
  switch (action.type) {
    case START_LOADING:
      return Object.assign({},
        state,
        { loading: true }
      );
    case END_LOADING:
      return Object.assign({},
        state,
        { loading: false }
      );
    default:
      return state;
  }
}
