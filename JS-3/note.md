# JS入门笔记3

## JS历史版本
- ES3, IE6支持 垃圾
- ES5
- ES6

## 语法上需要注意的点
1. 和c++类似, 行内的空格无意义 
    - var a = 1 和 var a=1没有区别
    - 加回车大部分情况都没有影响
    ```JavaScript
    var 
    a
    = 
    1
    ```
    - 只有一个地方不能加回车, return的后面(加了会自动补undefine)
2. 标识符可以是unicode字母或者$或者数字或者_或者中文(第一位不能以字母开头)
3. 注释//
4. block{} 和c++里面作用没差
5. if/else if同c++, 同样类似if当中只有一句语句时{}可以省略
6. 可以用的内建数据类型:(7种)
    - string
    - number
    - boolean
    - null
    - undefined
    - object类型指的是一种复合值，你可以在它上面设定属性（带名称的位置），每个属性持有各自的任意类型的值。它也许是JavaScript中最有用的类型
        - 属性既可以使用 点号标记法（例如，obj.a） 访问，也可以使用 方括号标记法（例如，obj["a"]） 访问。点号标记法更短而且一般来说更易于阅读，因此在可能的情况下它都是首选
        - 如果你有一个名称中含有特殊字符的属性名称，方括号标记法就很有用，比如obj["hello world!"] —— 当通过方括号标记法访问时，这样的属性经常被称为 键。[ ]标记法要求一个变量或者一个string 字面量（它需要包装进" .. "或' .. '）
        - 如果你想访问一个属性/键，但是它的名称被存储在另一个变量中时，方括号标记法也很有用
        ```JavaScript
        var obj = {
        a: "hello world",
        b: 42
        }
        var b = "a";
        obj[b]; // hello world
        obj["b"]; // 42
        ```
    - symbol(ES6新增)
    - JavaScript提供了一个typeof操作符，它可以检查一个值并告诉你它的类型是什么
    - 需要注意的是js当中只有值有类型, typeof操作符只是用来判断变量当中的值是什么类型的, js的变量本身只是简单的容器
    - typeof null返回了object是个bug, 不过估计是永远不会修了
    - 对于js常用的两类值类型: 数组和函数,但与其说它们是内建类型，这些类型应当被认为更像是子类型, object类型的特化版本
7. JS里面没有换行概念, 但是同理;可以用来表示一个语句结束而, 可以表示一个语句没完
8. JS的switch和c++当中也相同, 不break会继续向下走
9. 一样有三元运算符 表达式 ? 表达式1 : 表达式2
10. 逻辑运算符一样使用&&(And), ||(Or), !(Not)
11. while(), do...while(), for()同c++
```JavaScript
for (var i = 0; i < 5; ++i) {
    setTimeout(console.log(i));
}
// 对于这样的for循环, setTimeout一定会在循环结束之后才打印, 无论循环多么大的次数都如此, 而i自然打印出来的值也是打印时内存中的值
// 5
// 5
// 5
// 5
// 5
for (let i = 0; i < 5; ++i) {
    setTimeout(console.log(i));
}
// 对于let做了特殊处理
// 0
// 1
// 2
// 3
// 4
```
12. break, continue逻辑一样和c++相同都是作用于最近的一层循环
13. lable语句
    - 语法
    ```JavaScript
        foo: {
            console.log(1);
            break foo;
            console.log('本行不会输出');
        }
        console.log(2);
    ```
    - 面试:以下内容是什么?lable标签, 除了面试毫无作用
    ```JavaScript
        {
            foo: 1
        }
    ```

## 详细的JS数据类型相关
内建数据类型一共7种:(大小写无所谓)
- 数字number
    - 存储方式: JS当中数字按照64位浮点数形式存储
        - 符号占1位
        - 指数占11位(-1023~1024)
        - 有效数字52位(开头的1省略)
        - 范围:Number.MAX_VALUE:1.7976931348623157e+308, Number.MIN_VALUE:5e-324
        - 精度:最多52 + 1个二进制位表示的数字
    - 支持的写法
        - 整数
        - 小数
        - 科学计数法
        - 8进制
        - 16进制
        - 2进制
    - 特殊值
        - 0, 正0和负0: 都等于0, 只有1/0时这三个有区别
        - 无穷大:infinity, +infinity, -infinity
        - 无法表示的数字:NaN(Not a Number)但却是一个数字 NaN == NaN // false
    
- 字符串string
    - 存储方式: JS当中字符串是用类似UTF8形式存储(阉割版UTF-8, 定长的2个字节)
    - 写法
        - 单引号''
        - 双引号""
        - 反引号``:反引号中可以直接写回车不需要转义
    - 关于js的转义
        - \uFFFF表示对应的unicode字符
    - 字符串的属性(只有对象有属性, 字符串为什么会有参考后续js面向对象的内容)
        - length
        - 通过下标读取
    - base64转码
        - window.btoa 正常字符串转为Base64编码的字符串
        - window.atob 编码的字符串转为原来的字符串
        - 一般用来隐藏招聘启事里的邮箱
- 布尔值boolean
    - ture和false
    - 值不是布尔时到底算是true还是false? 五个falsy值,就是相当于false但又不是false的值
        - undefined
        - null
        - 0
        - NaN
        - ''
        - 其他值全是真值
- 符号symbol(几乎没什么卵用)
- 空undefined
- 空null
    - 为什么js有两个空?(设计的垃圾之处)
    - 区别:没有区别
    - 如果一个变量声明了, 但是没有赋值, 默认是undefined而不是null
    - 一个函数没有写return默认返回undefined
    - 习惯上把非对象的空值写作undefined, 对象的空值写作null, 实际上是没区别的
- 对象object
- 四个基本类型(number, string, bool, symbol)两空一对象
- 以下不是数据类型, 都属于object
    - 数组, 日期, 函数

js变量的声明形式:
- var a = 1
- let a = 1
- const a = 1
- 区别:
    - var是过时的, 不好用的方式
    - let是新的, 更合理的方式
    - const是声明时必须赋值且不能再改变(常量)
    - a = 1这是赋值, 用来声明是错的, 尽管不会报错
    - 不要用var, 只用let
    - var的bug属于面试常问, 见面经的内容

let声明规则:
- let声明的变量遵循块作用域, 出了{}就不存在了
- 不能重复声明
- 可以赋值也可以不不赋值
- 必须先声明再使用
- 全局声明的let不会变成window的属性, var会(这属于var的bug)
- for循环配合let有奇效
```JavaScript
for (let i = 0; i < 5; ++i) {
    setTimeout(console.log(i));
}
// 对于let做了特殊处理
// 0
// 1
// 2
// 3
// 4
```

const声明规则:
- 和let几乎一样
- 不可以改变const的值


变量声明的时候即指定了值也指定了类型

name和'name'的区别?
- name是变量, 值可以变, 类型也可以变
- 'name'是字符串常量, 不能是其他值

类型转换:
- number=>string
```JavaScript
String(n)
n + "" // 常用的方式
```
- string=>number
```JavaScript
Number(s)
parseInt(s)
ParseFloat(s)
s - 0
```
- x => bool
```JavaScript
Boolean(x)
!!x // 同c++归一化处理
```
- x=>string
```JavaScript
String(x)
x.toString()
```
js的傻逼bug:
```JavaScript
1.toString() // 报错, 因为js觉得1.后面应该加数字所以错了
(1).toString() // ok
1..toString() // ok
```

> bigint 2020年6月新增的类型, 几乎不用, 具体看MDN文档