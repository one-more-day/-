function Father(name) {
  this.name = name;
}
Father.prototype.getName = function () {
  return this.name;
};

function Child(name, age) {
  Father.call(this, name);
  this.age = age;
}
Child.prototype.getAge = function () {
  return this.age;
};
Object.setPrototypeOf(
  Child.prototype,
  (Object.create(Father.prototype).constructor = Child)
);
console.log(Father.prototype);
console.log(Child.prototype);