# JS 入门笔记 4

## 对象

- 定义:
  - 无序的数据组合
  - 键值对的集合
- 写法

```JavaScript
let obj = { 'name':'frank', 'age':18 }; // 简写
let obj = new Object({'name':'frank'}); // 正规写法
console.log({'name':'frank', 'age':18}); // 匿名对象
```

- 细节
  - 键名是字符串, 不是标识符, 可以包含任何字符
  - 引号可以省略, 省略之后就只能按照标识符的规则写
  - 就算是省略了引号, 键名也还是**字符串**(重要)

属性名: 每个 key 都是对象的属性名(Property)

属性值: 每个 value 都是对象的属性值

所有看着奇奇怪怪的属性名没关系, 反正都是字符串, 但是 js 的傻逼之处在于可能会给你做一些不希望的转换, 因此''非常必要

```JavaScript
let obj = {
    1: 'a',
    3.2: 'b',
    1e2: true, // js的傻逼想法会先把1e2变成数字100再变成字符串
    1e-2: false,
    .234: true,
    0xFF: true // 255: true
}

let a = 'xxx'
let obj1 = {
    a: 1111 // 'a': 1111
}
let obj2 = {
    [a]: 1111 // 'xxx': 1111
}
```

**变量**做属性名

- 如何使用变量作为属性名
  - 之前都是用常量做属性名
  - let p1 = 'name'
  - let obj = { p1: 'frank'}这样写, 属性名为'p1'
  - let obj = { [p1]: 'frank'}这样写, 属性名为'name'
- 对比
  - 不加[]属性名会自动变成字符串
  - 加了[]会当作变量求值
  - 值如果不是字符串, 则会自动变成字符串

```JavaScript
var obj = {
    [1+2+3+4]: '十' // '10': '十'
}
```

### 原型

- 每个对象都有原型
  - 原型里存着每个对象的共有属性
  - 比如 obj 的原型就是一个对象
  - obj.**proto**中存储这个对象的地址
  - 这个对象里有 toString/construtor/valueOf 等属性
- 对象的原型也是对象
  - 所以对象的原型也有原型
  - obj = {} 的原型即为所以对象的原型
  - 这个原型包含所有对象的共有属性, 是**对象的根**
  - 这个原型也有原型, 是 null

### 对象的隐藏属性

- 隐藏属性
  - js 中每一个对象都有一个隐藏属性
  - 这个隐藏属性储存着**其共有属性组成的对象**的地址
  - 这个公有属性组成的对象叫做原型
  - 也就是说隐藏属性储存着原型的地址

### 超纲知识

- 除了字符串, symbol 也能作为属性名

```javascript
let a = symbol();
let obj = { [a]: "hello" };
```

### 增删改查

删除属性

- delete obj.xxx 或者 delete obj['xxx'] 即可删除 obj 的'xxx'属性
  - 要区分属性值 undefined 和不含属性名
  - 不含有属性名 'xxx' in obj == false
  - 含有属性名但值为 undefined:'xxx' in obj && obj.xxx === undefined
- **注意**不能通过 obj.xxx === undefined 来证明 xxx 在不在 obj 里

查看属性

- 查看自身的所有属性
  - Object.keys(obj)
- 查看自身+共有属性
  - console.dir(obj)
  - 或者自己依次调用 Object.keys()打印出 obj.**proto**
- 查看一个属性在不在对象当中(含共有属性)
  - 'xxx' in obj
- 判断一个属性是自由的还是共有属性
  - obj.hasOwnProperty('toString')
- 两种方法查看属性
  - 中括号语法: obj['key']
  - 点语法:obj.key
  - 坑新人的语法: obj[key] // 变量 key 的值一般不为'key'
  - 请优先使用[]语法, 用.语法会误导你让你觉得 key 不是字符串
  - obj.name 等价于 obj['name']不等价于 obj[name]

修改和增加属性

- 直接赋值

```javascript
let obj = { name: "frank" }; // name是字符串
obj.name = "frank";
obj["name"] = "frank";
obj[name] = "frank"; // 错误 因为name是变量
obj["na" + "me"] = "frank";
let key = "name";
obj[key] = "frank";
obj.key = "frank"; // 错, 因为obj.key等价于obj["key"]
```

- 批量赋值

```javascript
Object.assign(obj, { age: 18, gender: "man" });
```

> !只有读的时候找不到会去看隐藏属性的原型, 写的时候没有这个属性会直接添加属性
> 如果非得要改共有属性的内容, 请通过 obj.\_\_proto\_\_二次索引
> 但是还是不推荐使用\_\_proto\_\_, 因为在不同浏览器上隐藏属性名字可能不一样
> 非得改原型通过 Object.prototype 去索引
> 一般来说永远不要修改原型, 因为会导致很多的 bug

### 不推荐使用**proto**

使用语法 Object.create(xxx)使用 xxx 作为原型创建对象, 对应的语法

```javascript
var comman = { 国籍: "中国", haircolor: "black" };
var person = Object.create(commom);
// person要在创建时设置值需要用以下语法
var person = Object.create(common, {
  name: { value: "frank" },
});
```

也就是说如果要设置原型应该在一开始就设定好原型是什么, 不要在声明了之后再改来改去
