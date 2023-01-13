const _completeDeepClone = (target) => {
  // 基本数据类型，直接返回
  if (typeof target !== "object" || target === null) return target;
  // 函数 正则 日期 ES6新对象,执行构造题，返回新的对象
  const constructor = target.constructor;
  
  if (/^(Function|RegExp|Date|Map|Set)$/i.test(constructor.name)) {
    console.log(target);
    return new constructor(target);
  }
  const cloneTarget = Array.isArray(target) ? [] : {};
  for (let prop in target) {
    if (target.hasOwnProperty(prop)) {
      cloneTarget[prop] = _completeDeepClone(target[prop]);
    }
  }
  return cloneTarget;
};
console.log(
  _completeDeepClone([
    {
      a: 1,
      b: {
        c: { d: 2 },
        e: new Date(),
      },
    },
  ])
);
