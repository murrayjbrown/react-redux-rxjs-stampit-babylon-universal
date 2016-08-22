import assert from 'assert';
import React from 'react';
import { mount, render, shallow } from 'enzyme';


const Fixture = () =>
  <div>
    <input id="checked" defaultChecked />
    <input id="not" defaultChecked={false} />
  </div>;

describe('(Framework) Karma Plugins', () => {
  it('Should expose "expect" globally.', () => {
    assert.ok(expect);
  });

  it('Should expose "chai" globally.', () => {
    assert.ok(chai);
  });

  it('Should expose "sinon" globally.', () => {
    assert.ok(sinon);
  });

  it('Should expose "should" globally.', () => {
    assert.ok(should);
  });

  it('Should expose "TestScheduler" globally.', () => {
    assert.ok(TestScheduler);
  });

  it('Should expose "Observable" globally.', () => {
    assert.ok(Observable);
  });


  it('Should have chai-as-promised helpers.', () => {
    const pass = new Promise(res => res('test'));
    const fail = new Promise((res, rej) => rej());

    return Promise.all([
      expect(pass).to.be.fulfilled,
      expect(fail).to.not.be.fulfilled
    ]);
  });

  it('should have chai-enzyme working', () => {
    let wrapper = shallow(<Fixture />);
    expect(wrapper.find('#checked')).to.be.checked();

    wrapper = mount(<Fixture />);
    expect(wrapper.find('#checked')).to.be.checked();

    wrapper = render(<Fixture />);
    expect(wrapper.find('#checked')).to.be.checked();
  });
});
