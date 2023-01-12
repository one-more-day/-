const data = [
  {
    id: 1,
    text: "节点1",
    parentId: 0,
    children: [
      {
        id: 2,
        text: "节点1_1",
        parentId: 1,
      },
    ],
  },
];
function treeToList(data) {
  const result = [];
  //深度优先遍历
  const dfs = (tree) => {
    tree.forEach((item) => {
      if (item.children) {
        dfs(item.children);
        //删除子节点
        delete item.children;
      }
      result.push(item);
    });
  };
  dfs(data);
  return result;
}
console.log(treeToList(data));
const listdata = [
  { id: 1, name: "部门1", pid: 0 },
  { id: 2, name: "部门2", pid: 1 },
  { id: 3, name: "部门3", pid: 1 },
  { id: 4, name: "部门4", pid: 3 },
  { id: 5, name: "部门5", pid: 4 },
  { id: 6, name: "部门6", pid: 0 },
];
function listToTree(data, pid = 0) {
  return data
    .filter((item) => item.pid === pid) //最外层节点
    .map((item) => {
      let children = listToTree(data, item.id);
      if (children.length > 0) {
        return {
          ...item,
          children,
        };
      } else {
        return {
          ...item,
        };
      }
    });
}
console.log(listToTree(listdata));
