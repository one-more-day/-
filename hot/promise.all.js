/**
 * @param proms 迭代器 返回多个Promise
 * @return
 *      所有的Promise 成功,返回成功;数据为所有Promise成功的数据，按传入顺序排列
 *      一个失败，返回失败，原因为第一个失败的原因
 */
Promise._all = function (proms) {
  return new Promise((resolve, reject) => {
    if (proms == null || typeof proms[Symbol.iterator] !== "function") {
      throw new TypeError(`${proms} is not a iterable`);
    }
    proms = [...proms];
    if (proms.length === 0) {
      resolve([]);
    }
    let count = 0;
    const values = [];
    proms.forEach((prom, index) => {
      Promise.resolve(prom)
        .then((res) => {
          values[index] = res;
          if (++count === proms.length) resolve(values);
        })
        .catch(reject);
    });
  });
};
Promise._all([
  Promise.reject(1),
  Promise.resolve(2),
  Promise.resolve(3),
  4,
]).then(
  (data) => {
    // data:[1,2,3,4]
    // 传递[pro1,pro2,pro3,4]的话:内部默认处理Promise.resolve(4)
    console.log("成功", data);
  },
  (reason) => {
    // reason:reason2
    console.log("失败", reason);
  }
);