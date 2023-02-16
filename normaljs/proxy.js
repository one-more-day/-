const target = { age: 5 };

const proxy = new Proxy(target, {
  get() {
    return this === target;
  },
});

console.log(proxy.age);
console.log(proxy === target);
const fn =  (a, b) => {
  console.log(arguments);
  console.log(new.target);
};
const a =  fn(1, 2);
