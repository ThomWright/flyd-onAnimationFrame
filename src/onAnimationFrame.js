import flyd from 'flyd';
import raf from 'raf';

const requester = function() {
  let handle;
  const reset = () => handle = null;
  const request = callback => {
    handle = raf(() => {
      reset();
      callback();
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

  const forCallbackWith = outputStream => () => {
    const o = q.shift();

    if (q.length > 0) {
      requestFrame(forCallbackWith(outputStream));
    }

    outputStream(o);
  };

  return flyd.combine((input, outputStream) => {
    q.push(input());
    requestFrame.ifNotInProgress(forCallbackWith(outputStream));
  }, [inputStream]);
}
