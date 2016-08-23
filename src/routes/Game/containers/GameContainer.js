import { connect } from 'react-redux';

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the game:   */

import Game from '../../../components/Game';

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

export const mapActionCreators = {
};

const mapStateToProps = (state) => ({
  game: state.game
});

export default connect(mapStateToProps, mapActionCreators)(Game);
