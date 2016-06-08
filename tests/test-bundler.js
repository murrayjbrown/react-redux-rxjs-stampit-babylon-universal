// ---------------------------------------
// Test Environment Setup
// ---------------------------------------
import 'babel-polyfill';
import sinon from 'sinon';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';
import Rx from 'rxjs';
import Parse from 'parse';
import when from 'when';


chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.use(chaiEnzyme());

global.when = when;
global.Parse = Parse;
global.chai = chai;
global.sinon = sinon;
global.expect = chai.expect;
global.should = chai.should();
global.TestScheduler = Rx.TestScheduler;
global.Observable = Rx.Observable;

chai.config.includeStack = true;


// ---------------------------------------
// Require Tests
// ---------------------------------------
// for use with karma-webpack-with-fast-source-maps
// NOTE: `new Array()` is used rather than an array literal since
// for some reason an array literal without a trailing `;` causes
// some build environments to fail.
const __karmaWebpackManifest__ = new Array() // eslint-disable-line
const inManifest = (path) => ~__karmaWebpackManifest__.indexOf(path);

// require all `tests/**/*.spec.js`
const testsContext = require.context('./', true, /\.spec\.js$/);

// only run tests that have changed after the first pass.
const testsToRun = testsContext.keys().filter(inManifest)
  ; (testsToRun.length ? testsToRun : testsContext.keys()).forEach(testsContext);

const componentsContext = require.context('../src/',
  true, /^((?!client|bootstrap|font-awesome|server).)*\.js$/);
componentsContext.keys().forEach(componentsContext);
