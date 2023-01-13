/***
 * 动态改变 this指向
 */
/**
 * @param context 对象
 */
Function.prototype._call = function (context, ...args) {
  context = context === undefined || context === null ? window : context;
  context.__fn = this;
  let res = context.__fn(...args);
  delete context.__fn;
  return res;
};

Function.prototype._apply = function (context, args) {
  context = context === undefined || context === null ? window : context;
  context.__fn = this;
  let res = context.__fn(...args);
  delete context.__fn;
  return res;
};
Function.prototype._bind = function (context, ...args1) {
  context = context === undefined || context === null ? window : context;
  let _this = this;
  return function (...args2) {
    context.__fn = _this;
    let res = context.__fn([...args1, ...args2]);
    delete context.__fn;
    return res;
  };
};
const obj = { a: 4 };
function Person(arg) {
  console.log(arg);
  return this.a;
}
Person._call(obj, 3);
