import React from 'react';
import classes from './Game.scss';

export const Game = (props) => (
  <div>
    <div className={classes.gameContainer}>
      <canvas className={classes['game']} />
    </div>
  </div>
);

Game.propTypes = {
  scene: React.PropTypes.object
};

export default Game;
