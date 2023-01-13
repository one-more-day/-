/**
 * instanceof 右边变量原型在左边原型链上即可
 *
 * typeof 判断基本类型 7种 number boolean string undefind function object symbol
 * 000 对象
 * null 机器码均为零
 *
 * Object.prototype,toString().call()
 */
function myInstanceof(left, right) {
  let proto = Object.getPrototypeOf(left),
    prototype = right.prototype;
  while (true) {
    if (!proto) return false;
    if (proto === prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}
function Person() {}
const p = new Person();
console.log(myInstanceof(p, Object));
