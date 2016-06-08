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
  res.success('Hello!');
};

const signUp = (req, res) => {
  const user = new Parse.User();
  user.set('username', 'nathanvale');
  user.set('password', 'password');
  return user.signUp(null)
    .then(
    response => res.success(response),
    err => res.error(err.message)
    );
};

const logIn = (req, res) =>
  Parse.User.logIn(
    req.params.username,
    req.params.password
  )
    .then(
    response => res.success(response),
    error => res.error(error)
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
