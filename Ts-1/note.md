# TS 入门笔记

安装环境,这里只找了最简单配置的 tsc 编译器

使用 nodejs 安装 tsc

```bash
npm install -g typescript
```

安装 node 的.d.ts 库

```bash
npm install @types/node --dev-save
```

创建 tsconfig.json

typescript 的项目都需要一个 tsconfig.json

```bash
tsc --init
```

修改 json 文件, 指定 es6, 把 sourceMap 设置成 true 就可以混合使用 ts 和 js

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es6",
    "noImplicitAny": false,
    "sourceMap": true,
    "allowJs": true
  },
  "exclude": ["node_modules"]
}
```

编译 ts 文件, 将 ts 文件翻译成 js, 然后用 node 运行

```bash
tsc xx.ts
node xx.js
```

## 类型

类(class)和类型(type)的区别?
也就翻译成中文会产生歧义, 英文明显是不一样的
JS 基本类型:

- 简单类型: null, undefined, string, number, bool, number, symbol, bigint

- 复杂类型: object

对于 js 类型(type)就只有以上这八种, 可以用 typeof 运算符获取, typeof 有两个 bug, typeof null 返回'object'应该要返回 null, typeof 函数名 返回'function'应该要返回 object, 不要将 function 误认为是一种 type, 记住 function 是一个类, function 的 type 是 object

JS 中类->object

js 面向对象的编程范式:

1. 基于 class 关键字

   ```JavaScript
   class Person {
       ...
   }
   ```

2. 基于原型

   ```JavaScript
   // 构造函数, 会自动做四件事情, 具体看JS类的部分
   function Person {
   ...
   }
   // 利用函数自带原型来设置共有属性
   Person.prototype.func = function() {
       ...
   }
   ```

## TS 语法

1. :类型

   ```TypeScript
   const a:number = 1;
   const b:null = null;
   const c:string = 'hi';
   const d:boolean = true;
   const e:symbol = Symbol('hi');
   const f:bigint = 123n;
   const obj:Object = {};
   const obj:Array<string|number> = ['1', '2', 3];
   // 1. 类型写在函数体
   const add1 = (a:number, b:number):number => a+b;
   // 2. :后面指定返回类型再写函数体
   const add2: (a:number, b:number) => number = (a, b) => a +  b;
   // 3. type 编写
   type Add = (a:number, b:number) => number;
   const add:Add = (a, b) => a + b;
   // 4. 如果有属性用interface
   interface AddWithProps {
       (a: number, b: number) : number
       xxx: string
   };
   const add2:AddWidthProps = (a, b) => a + b;
   add2.xxx = 'yyy';
   ...
   ```

   - object(className type interface)

2. TS 相对于 JS 多的类型

   ```TypeScript
   let a: any = 'hi'; // any可以随时改变类型
   let b: unknown = JSON.parse('{"name":"frank"}'); // unknown 要用必须明确是什么东西, unknown是现在不知道, any可以随意变
   type C = {name:string};
   console.log((b as C).name) // 断言
   let print: () => void = function() {
       console.log(1)
       return undefined;
   } // void用来指明函数没有返回值
   // nerver表示不应该存在的类型, 用来判断出现问题
   type X = number & string; // 这样算出来的类型就是nerver, 因为数字和字符串没有交集
   // 元组, 用来声明固定长度且每个位置元素的类型都限定的数组, 这是只在TS存在的概念, 绕过TS在JS中这还是个数组
   let p: [number, string] = [100, 'x'];
   // 枚举类型,建议不用,和c++,java当中差不多
   enum DIR {东, 西, 南, 北};
   ```

   - any
   - unknow
   - void
   - never
   - enum
   - 元组

3. class 是值还是 type? 即是值又是类型

4. 联合类型 | 然后可以用 typeof 来判断简单类型, 或者使用同一个属性不同值来判断具体当前的变量是哪种复杂类型

   ```typescript
   type A = {
     name: "a";
     age: number;
   };
   type B = {
     name: "b";
     gender: string;
   };
   const f = (n: number | B) => {
     if (typeof n === "number") {
       n.toFixed();
     } else {
       n.name;
     }
   };
   const l = (n: A | B) => {
     if (n.name === "a") {
       console.log(n.age);
     } else {
       console.log(n.gender);
     }
   };
   ```

5. 交叉类型&, 一般不能用于简单类型, 一旦用了简单类型就会变成 nerver

   ```typescript
   type A = { name: string } & { age: number };
   const a: A = {
     name: "frank",
     age: 18,
   };
   ```

6. ts 泛型

   ```typescript
   // 泛型--广泛的类型
   type Add<T> = (a: T, b: T) => T;
   type AddNumber = Add<number>;
   type AddString = Add<string>;
   const addN: Add<number> = (a, b) => a + b;
   const addS: AddString = (a, b) => a + b;
   console.log(addN(1, 2));
   console.log(addS("1", "2"));
   ```

7. ts 重载

   ```typescript
   // 重载
   function add(a: number, b: number): number;
   function add(a: string, b: string): string;
   function add(a: any, b: any): any {
     if (typeof a === "number" && typeof b === "number") {
       return a + b;
     } else {
       return a + " " + b;
     }
   }
   ```
