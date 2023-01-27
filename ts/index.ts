/**
 *  keyof 索引查询
 *  公共属性
 */
interface Person {
  name: string;
  age: number;
}
const person: Person = { name: "1", age: 1 };
//联合类型 string | nnumber
const person1: Person[keyof Person] = "a";

/**
 * & 交叉类型 两个类型相并，key相同类型为 never
 * | 其中一种类型
 */

type A1 = "x" | 1;
let a: A1 = "x";
let b: A1 | 2 = "x";
a = b;

/**
 * 三元运算符
 */
type P<T> = T extends "x" ? 1 : 2;
type A3 = P<"x" | "y">;
let pt: P<"x"> = 1;
let pt1: P<1> = 2;

type P1<T> = [T] extends ["x"] ? 1 : 2;
/**
 * type A4 = 2;
 */
type A4 = P1<"x" | "y">;

//Utility type
/**
 * Partial<T> 可选的
 */
type _Partial<T> = {
  [P in keyof T]?: T[P];
};
type _P1 = {
  key1: string;
  key2: number;
  key3: "";
};
type _KP1 = keyof _P1;
let _KP1EP: _KP1 = "key1"; //keyof T 取到的是T所有key的联合类型
type EXTENDP1<K> = K extends keyof _P1 ? "a" : "b";
let extendP: EXTENDP1<"key1"> = "a";
/***
 * Readonly<T>
 */
type _Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
/**
 * Pick<T,K>
 */
type _Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
let pickp1: _Pick<_P1, keyof { key1: string }> = {
  key1: "1",
};
/**
 * Record<K,T>  K中所有key 置为 T
 *
 * keyof any得到的是string | number | symbol
 */
type _Record<K extends keyof any, T> = {
  [P in K]: T;
};

/**
 * Exclude<T , U> 提取存在与T,但不存在于U的类型组成的联合类型
 */
type _Exclude<T, U> = T extends U ? never : T;
type _ExcludeEG = _Exclude<"key1" | "key2", "key1">;
/**
 *  Extract<T, U>提取联合类型T和联合类型U的所有交集。
 */
type _Extract<T, U> = T extends U ? T : never;
type extractEG = _Extract<"key1" | "key2", "key1">;

/**
 * Omit<T, K> 从类型T中剔除K中的所有属性.
 */
type _Omit<T, K> = _Pick<T, _Exclude<keyof T, K>>;
type Omit_1 = {
  key1: string;
  key2: number;
  key3: () => void;
};
type Omit_2 = {
  key1: string;
  key2: number;
};
type Omit_3 = _Omit<Omit_1, "key1" | "key3">;
let omitEg: Omit_3 = {
  key2: 1,
};
/**
 * Parameters<T> 获取函数类型的参数
 */
type _Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;
/**
 * ReturnType<T> 获取函数类型的返回值
 */
type _ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any;
