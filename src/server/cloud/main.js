
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
  res.success('boom');
});

Parse.Cloud.define('signUp', (req, res) => {
  try {
    const user = new Parse.User();
    user.set('username', 'nathanvale');
    user.set('password', 'password');

    return user.signUp(null)
      .then(
      response => {
        res.success(response);
      },
      err => {
        console.log(res);
        res.error(err.message);
      });
  } catch (err) {
    return res.error(err.message); // -->  {code: 141, message: "asdf is not defined"}
  }
});

Parse.Cloud.define('logOut', (req, res) => {
  try {
    const user = req.user;
    return user.logOut()
      .then(
      response => {
        res.success(response);
      },
      err => {
        console.log(res);
        res.error(err.message);
      });
  } catch (err) {
    return res.error(err.message); // -->  {code: 141, message: "asdf is not defined"}
  }
});
