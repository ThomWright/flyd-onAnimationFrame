/*global describe*/
/*global it*/
/*global beforeEach*/
// /*global afterEach*/
/*global expect*/

import flyd from 'flyd';
import onAnimationFrame from '../onAnimationFrame.js';

// const stream = flyd.stream();
// const onFrame = onAnimationFrame(stream);
// flyd.map(function(x) {
//   console.log('Current time is', x);
// }, onFrame);
//
// [1, 2, 3, 4, 5]
//   .map(n => ({n: n.toString()}))
//   .forEach((n) => stream(n));

function* range(low, high) {
  var i = low;
  while(i <= high) {
    yield i++;
  }
}


describe('onAnimationFrame', function() {

  let stream, onFrame;

  beforeEach(() => {
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

  it('should be asynchronous', function(done) {
    let x = 0;

    flyd.stream([onFrame], () => {
      x = 1;
      // using done makes sure that the callback actually happens
      done();
    });

    stream({});
    expect(x).to.equal(0); // if it was synchronous, then the callback would have changed x
  });

  it('should be async every time', function(done) {
    const LIMIT = 5;
    let x = 0;

    flyd.stream([onFrame], () => {
      const n = onFrame().n;
      x = n;
      if (n === LIMIT) {
        done();
      } else {
        // if the callbacks were synchronous, then x would change again before nextTick
        process.nextTick(() => expect(x).to.equal(n));
      }
    });

    [...range(1, LIMIT)]
      .map(n => ({n}))
      .forEach(n => stream(n));
  });
});
