import HomeRoute from 'routes/Home';

describe('(Route) Home', () => {
  let route;

  beforeEach(() => {
    route = HomeRoute({});// eslint-disable-line new-cap
  });

  it('Should return a route configuration object', () => {
    expect(typeof(route)).to.equal('object');
  });

  it('Should define a route component', () => {
    expect(route.path).to.equal('');
  });
});
