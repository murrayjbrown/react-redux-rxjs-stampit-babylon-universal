Parse.Cloud.Simulator = {
  functions: {},
  runFunction: (fnName, params, user) => {
    const request = {
      params,
      user
    };
    const response = {
      success: sinon.spy(),
      error: sinon.spy()
    };
    Parse.Cloud.Simulator.functions[fnName](request, response);
    return response;
  },
  reset: () => {
    Parse.Cloud.Simulator.functions = {};
  }
};
Parse.Cloud.define = (fnName, fn) => {
  Parse.Cloud.Simulator.functions[fnName] = fn;
};

Parse.Cloud.define('hello', (request, response) => {
  response.success('Hello world!');
});

describe('Cloud', () => {
  beforeEach(() => {

  });

  it('says hi', () => {
    const response = Parse.Cloud.Simulator.runFunction('hello');
    // response.success.called.should.be.true;
    response.success.args[0][0].should.equal('Hello world!');
  });
  it('Should define a route component', () => {

  });
});
