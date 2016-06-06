
Parse.initialize('myAppId');
Parse.serverURL = 'http://localhost:3000/api';

/*
How to use master key...
var query = new Parse.Query('Messages');
query.count({ useMasterKey=true })


How to use session
var user = req.user;
vr token  = user.getSessionToken();
query.find(sessionToken: token);
*/

Parse.Cloud.define('hello', (req, res) => {
  res.success('Boom!');
});

Parse.Cloud.define('signUp', (req, res) => {
  const user = new Parse.User();
  user.set('username', 'nathanvale2');
  user.set('password', 'password');
  return user.signUp(null)
    .then(
    response => res.success(response),
    err => res.error(err.message)
    );
});

Parse.Cloud.define('logIn', (req, res) =>
  Parse.User.logIn(
    'nathanvale',
    'password'
  )
    .then(
    response => res.success(response),
    err => res.error(err.message))
);

Parse.Cloud.define('logOut', (req, res) =>
  Parse.User.logOut()
    .then(
    response => res.success(response),
    err => res.error(err.message)
    )
);
