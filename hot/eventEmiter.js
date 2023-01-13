//发布与订阅者模式
class EventEmiter {
  constructor() {
    this.cache = []; //存放不同事件
  }
  //添加事件
  on(name, fn) {
    if (this.cache[name]) this.cache[name].push(fn);
    else this.cache[name] = [fn];
  }
  off(name, fn) {
    let tasks = this.cache[name]; //回调队列
    if (tasks) {
      const index = tasks.findIndex((f) => f === fn);
      if (index > 0) {
        tasks.splice(index, 1);
      }
    }
  }
  emit(name, once = false, ...args) {
    if (this.cache[name]) {
      //创建副本，数组不会因回调函数的继续注册相同事件而死循环
      let tasks = this.cache[name].slice();
      for (let fn of tasks) {
        fn(...args);
      }
      if (once) {
        delete this.cache[name];
      }
    }
  }
}
let eventsBus = new EventEmiter();
let fn1 = function (name, age) {
  console.log(name, age);
};
let fn2 = function (name, age) {
  console.log("fn", name, age);
};
eventsBus.on("test", fn1);
eventsBus.on("test", fn2);
eventsBus.emit("test", false, "Jason", 18);
