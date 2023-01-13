Array.prototype._map = function (callback) {
  // 排除回调非函数情况
  if (typeof callback !== "function") {
    throw new TypeError(`${callback} is not a function`);
  }
  // 排除this为非可迭代对象情况
  if (this == null || typeof this[Symbol.iterator] !== "function") {
    throw new TypeError(`${this} is not a iterable`);
  }
  const res = [];
  for (let i = 0; i < this.length; i++) {
    res.push(callback(this[i], i, this));
  }
  return res;
};

console.log(
  [1, 1, 1, 1]._map((item) => {
    return ++item;
  })
);
