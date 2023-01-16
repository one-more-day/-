/**
 * 实现promise
 */
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
function isPromise(obj) {
  return !!(obj && typeof obj === "object" && typeof obj._then === "function");
}
const runMicroTask = (callback) => {
  if (process && process.nextTick) {
    process.nextTick(callback);
  } else if (MutationObserver) {
    const p = document.createElement("p");
    const observe = new MutationObserver(callback);
    observe.observe(p, {
      childList: true,
    });
    p.innerHTML = "1";
  } else {
    setTimeout(callback, 0);
  }
};
class MyPromise {
  constructor(executor) {
    this._state = PENDING;
    this._value = undefined;
    this._handlers = []; //函数队列

    try {
      executor(this._resolve.bind(this), this._reject.bind(this));
    } catch (error) {
      this._reject(error);
      console.log(error);
    }
  }
  _pushHandlers(executor, state, resolve, reject) {
    this._handlers.push({
      executor,
      state,
      resolve,
      reject,
    });
  }
  _then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this._pushHandlers(onFulfilled, FULFILLED, resolve, reject);
      this._pushHandlers(onRejected, REJECTED, resolve, reject);
      this._runHandlers();
    });
  }
  /**
   * 处理一个handler
   * @param {Object} handler
   */
  _runOneHandler({ executor, state, resolve, reject }) {
    queueMicrotask(() => {
      if (this._state !== state) {
        // 状态不一致，不处理
        return;
      }

      if (typeof executor !== "function") {
        // 传递后续处理并非一个函数
        this._state === FULFILLED ? resolve(this._value) : reject(this._value);
        return;
      }
      try {
        const result = executor(this._value);
        if (isPromise(result)) {
          result._then(resolve, reject);
        } else {
          resolve(result);
        }
      } catch (error) {
        reject(error);
        // console.error(error);
      }
    });
  }
  /**
   * 执行队列
   */
  _runHandlers() {
    if (this._state === PENDING) return;
    while (this._handlers[0]) {
      const handler = this._handlers[0];
      this._runOneHandler(handler);
      this._handlers.shift();
    }
  }
  /**
   * 改变状态
   * @param {string} newState
   * @param {any} value
   * @returns
   */
  _changeState(newState, value) {
    if (this._state !== PENDING) return;
    this._state = newState;
    this._value = value;
    this._runHandlers();
  }
  _resolve(data) {
    this._changeState(FULFILLED, data);
  }
  _reject(reason) {
    this._changeState(REJECTED, reason);
  }
}

setTimeout(() => {
  console.log(2);
});
const a = new MyPromise((resolve, reject) => {
  resolve(1);
  console.log(3);
});
a._then((res) => {
  throw 111;
  console.log(res);
  return 4;
})._then((res) => {
  console.log(res);
});
a._then((res) => {
  console.log(res);
  return 4;
})._then((res) => {
  console.log(res);
});
