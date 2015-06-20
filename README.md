# flyd-onAnimationFrame

[![Travis](https://img.shields.io/travis/ThomWright/flyd-onAnimationFrame.svg?style=flat-square)](https://travis-ci.org/ThomWright/flyd-onAnimationFrame)
[![npm](https://img.shields.io/npm/v/flyd-onanimationframe.svg?style=flat-square)](https://www.npmjs.com/package/flyd-onanimationframe)
[![David](https://img.shields.io/david/ThomWright/flyd-onAnimationFrame.svg?style=flat-square)](https://david-dm.org/ThomWright/flyd-onAnimationFrame)
[![David](https://img.shields.io/david/dev/ThomWright/flyd-onAnimationFrame.svg?style=flat-square)](https://david-dm.org/ThomWright/flyd-onAnimationFrame#info=devDependencies)

Emits values on successive animation frames.

**Signature**

`Stream -> Stream`

**Usage**

```javascript
const stream = flyd.stream();
const onFrame = onAnimationFrame(stream);

flyd.map(function(x) {
  console.log('Time/Output', Date.now(), x);
}, onFrame);

[1, 2, 3, 4, 5]
  .forEach(n => stream(n));

// Time/Output 1434813866911 1
// Time/Output 1434813866927 2
// Time/Output 1434813866943 3
// Time/Output 1434813866961 4
// Time/Output 1434813866977 5

```
