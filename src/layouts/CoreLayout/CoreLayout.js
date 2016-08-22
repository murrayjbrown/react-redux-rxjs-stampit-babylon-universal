import React from 'react';
import Header from '../../components/Header';

const styles = require('./CoreLayout.scss');

export const CoreLayout = ({ children }) =>
  (<div className="container text-center">
    <Header />
    <div className={styles.mainContainer}>
      {children}
    </div>
  </div>
  );


CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired,
};

export default CoreLayout;
