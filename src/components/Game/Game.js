import React from 'react';
import classes from './Game.scss';

export const Game = (props) => (
  <div>
    <div className={classes.gameContainer}>
      <canvas className={classes['game']} ref={(c) => props.refCanvas(c)} />
    </div>
    <button className="btn btn-default" onClick={props.bgColourize}>
      Colourize background
    </button>
  </div>
);

Game.propTypes = {
  bgColourize: React.PropTypes.func.isRequired,
  refCanvas: React.PropTypes.func.isRequired
};

export default Game;
