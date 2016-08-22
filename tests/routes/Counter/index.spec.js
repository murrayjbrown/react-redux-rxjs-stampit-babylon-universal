import CounterRoute from 'routes/Counter';

describe('(Route) Counter', () => {
  let route;

  beforeEach(() => {
    route = CounterRoute({}); // eslint-disable-line new-cap
  });

  it('Should return a route configuration object', () => {
    expect(typeof (route)).to.equal('object');
  });

  it('Configuration should contain path `counter`', () => {
    expect(route.path).to.equal('counter');
  });
});
