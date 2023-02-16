/***
 * 单词 打乱顺序 。
比方说，句子 "This is a sentence" 可以被打乱顺序得到 "sentence4 a3 is2 This1" 或者 "is2 sentence4 This1 a3" 。
给你一个 打乱顺序 的句子 s ，它包含的单词不超过 9 个，请你重新构造并得到原本顺序的句子。
输入：s = "is2 sentence4 This1 a3"
输出："This is a sentence"
解释：将 s 中的单词按照初始位置排序，得到 "This1 is2 a3 sentence4" ，然后删除数字。
 */
const demo = (str) => {
  const strArr = str.split(" ");
  const len = strArr.length;
  const map = new Map();
  let res = [];
  console.log(strArr);
  strArr.map((item) => {
    map.set(
      Number(item.slice(item.length - 1, item.length)),
      item.slice(0, item.length - 1)
    );
  });
  console.log(map);
  for (let i = 1; i <= len; i++) {
    res.push(map.get(i));
  }
  console.log(res.join(' '));
};
demo("is2 sentence4 This1 a3");

