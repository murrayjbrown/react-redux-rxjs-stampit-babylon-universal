// import { logIn } from 'server/cloud/auth';
import when from 'when';

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

function getArguments(params, user) {
  return {
    req: {
      params,
      user
    },
    res: {
      success: sinon.spy(),
      error: sinon.spy()
    }
  };
}

const logIn = (req, res) =>
  Parse.User.logIn(
    'nathanvale',
    'password'
  )
    .then(
    response => res.success(response),
    err => res.error(err.message)
    );

require('server/cloud/main');

describe('Cloud', () => {
  beforeEach(() => {

  });

  it('Should say boom!', () => {
    const response = Parse.Cloud.Simulator.runFunction('hello');
    // response.success.called.should.be.true;
    response.success.args[0][0].should.equal('Boom!');
  });

  it('Should logIn', (done) => {
    const { req, res } = getArguments(
      { username: 'nathanvale' },
      { password: 'password' }
    );

    const stub = sinon.stub(Parse.User, 'logIn')
      .returns(when('logIn!'));

    logIn(req, res)
      .then(
      () => {
        expect(stub).calledWith('nathanvale', 'password');
        expect(res.success).calledWith('logIn!');
      }
      )
      .then(done, done);

    stub.restore();
  });
});
