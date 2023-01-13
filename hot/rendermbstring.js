String.prototype.render = function (data) {
  return this.replace(/{{[.\s\S]*?}}/g, (match) => {
    if ((match = match.substring(2, match.length - 2).trim()) == "") return "";
    else if (match.startsWith("#"))
      return eval(match.substr(1, match.length - 1));
    else {
      return data[match] ? data[match] : "";
    }
  });
};
const data = {
  name: "小明",
  age: 16,
  school: "第三中学",
  classroom: "教室2",
};

console.log(
  "{{ name }} 今年 {{ age }} 岁，就读于 {{ school }} 今天在 {{ classroom }} 上课，{{ name }} {{ #data.age >= 18 ? '成年了' : '未成年' }}".render(
    data
  )
);
