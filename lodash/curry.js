var abc = function (a, b, c) {
  return [a, b, c];
};

const curry = (fn) => {
  return (...args) => {
    if (args.length < fn.length) {
      return (...other) => curry(fn)(...args, ...other);
    }
    return fn(...args);
  };
};
var curried = curry(abc);

console.log(curried(1)(2));
console.log(curried(1)(2)(3));
