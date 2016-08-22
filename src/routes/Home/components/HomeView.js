import React from 'react';
import DuckImage from '../assets/Duck.jpg';
import classes from './HomeView.scss';
import Helmet from 'react-helmet';

export const HomeView = () => (
  <div>
    <Helmet
      title="251 Home Page"
    />
    <h4>Welcome!</h4>
    <img
      alt="This is a duck, because Redux!"
      className={classes.duck}
      src={DuckImage}
    />
  </div>
);

export default HomeView;
