import flyd from 'flyd';
import raf from 'raf';

const requester = function() {
  let handle;
  const reset = () => handle = null;
  const request = callback => {
    handle = raf(() => {
      reset();
      callback(Date.now());
    });
  };
  request.ifNotInProgress = callback => {
    if (!handle) {
      request(callback);
    }
  };
  return request;
};

export default function(inputStream) {
  const q = [];
  const requestFrame = requester();

  const callbackFor = outputStream => (time) => {
    const o = Object.assign({
      time
    }, q.shift());

    if (q.length > 0) {
      requestFrame(callbackFor(outputStream));
    }

    outputStream(o);
  };

  return flyd.stream([inputStream], (output) => {
    q.push(inputStream());
    requestFrame.ifNotInProgress(callbackFor(output));
  });
}
