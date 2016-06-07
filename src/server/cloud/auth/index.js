/*
How to use master key...
var query = new Parse.Query('Messages');
query.count({ useMasterKey=true })


How to use session
var user = req.user;
vr token  = user.getSessionToken();
query.find(sessionToken: token);
*/

const hello = (req, res) => {
  res.success('Boom!');
};

const signUp = (req, res) => {
  const user = new Parse.User();
  user.set('username', 'nathanvale2');
  user.set('password', 'password');
  return user.signUp(null)
    .then(
    response => res.success(response),
    err => res.error(err.message)
    );
};

const logIn = (req, res) =>
  Parse.User.logIn(
    'nathanvale',
    'password'
  )
    .then(
    response => res.success(response),
    err => res.error(err.message)
    );

const logOut = (req, res) =>
  Parse.User.logOut()
    .then(
    response => res.success(response),
    err => res.error(err.message)
    );

export {
hello,
signUp,
logIn,
logOut
};
