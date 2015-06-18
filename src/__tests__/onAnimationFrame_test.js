/*global describe*/
/*global it*/
/*global before*/
// /*global afterEach*/
/*global expect*/

var flyd = require('flyd');
var onAnimationFrame = require('../onAnimationFrame.js');

// const stream = flyd.stream();
// const onFrame = onAnimationFrame(stream);
// flyd.map(function(x) {
//   console.log('Current time is', x);
// }, onFrame);
//
// [1, 2, 3, 4, 5]
//   .map(n => ({n: n.toString()}))
//   .forEach((n) => stream(n));

describe('onAnimationFrame', function() {

  let stream, onFrame;

  before(() => {
    stream = flyd.stream();
    onFrame = onAnimationFrame(stream);
  });

  it('should pass through the wrapped stream\'s output', function(done) {
    const value = 0;

    flyd.stream([onFrame], () => {
      expect(onFrame().value).to.equal(value);
      done();
    });

    stream({value});
  });

  it('ends', function(done) {
    done();
  });
});
