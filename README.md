# flyd-animationFrame
Emits values on successive animation frames.

**Signature**

`Stream -> Stream`

**Usage**

```javascript
const stream = flyd.stream();
const onFrame = onAnimationFrame(stream);
flyd.map(function(x) {
  console.log('Output', x);
}, onFrame);

[1, 2, 3, 4, 5]
  .map(n => ({n: n.toString()}))
  .forEach((n) => stream(n));

// Output { time: 1434644236891, n: '1' }
// Output { time: 1434644236908, n: '2' }
// Output { time: 1434644236924, n: '3' }
// Output { time: 1434644236940, n: '4' }
// Output { time: 1434644236956, n: '5' }
```
