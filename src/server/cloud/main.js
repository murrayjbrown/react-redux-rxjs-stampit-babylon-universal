
Parse.initialize('myAppId');
Parse.serverURL = 'http://localhost:3000/api';

import { hello, signUp, logIn, logOut } from './auth/';


Parse.Cloud.define('hello', hello);
Parse.Cloud.define('signUp', signUp);
Parse.Cloud.define('logIn', logIn);
Parse.Cloud.define('logOut', logOut);
