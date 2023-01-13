function _get(obj, path, defaultValue = "undefined") {
  let newPath = [];
  if (Array.isArray(path)) {
    newPath = path;
  } else {
    newPath = path.replace(/\[/g, ".").replace(/\]/g, "").split(".");
    console.log(newPath);
  }
  return newPath.reduce((o, k) => {
    return (o || {})[k];
  }, obj || defaultValue);
}
var object = { a: [{ b: { c: 3 } }] };
console.log(_get(object, "a[0].b.c"));
_get(object, "a[0].b.c");
