import React from 'react';
import { Header } from 'components/Header/Header';
import { IndexLink, Link } from 'react-router';
import { shallow } from 'enzyme';

describe('(Component) Header', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Header />);
  });

  it('Renders a welcome message', () => {
    const welcome = wrapper.find('h1');
    expect(welcome).to.exist;
    expect(welcome.text()).to.match(/React Redux Starter Kit/);
  });

  describe('Navigation links...', () => {
    it('Should render an IndexLink to Home route', () => {
      expect(wrapper.contains(<IndexLink to="/" />)).to.equal.true;
    });

    it('Should render an Link to Counter route)', () => {
      expect(wrapper.contains(<Link to="/counter" />)).to.equal.true;
    });
  });
});
