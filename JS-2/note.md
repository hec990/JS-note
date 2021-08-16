# JS入门笔记2
## 打开浏览器的过程
- chrome.exe
  - 双击图标, 运行chrome.exe文件
  - 开启chrome进程, 作为主进程
  - 主进程会开启一些辅助进程, 如网络服务、GPU加速
  - 每新建一个网页，就有可能开启一个子进程
- 浏览器的功能
  - 发起请求, 下载HTML, 解析CSS, 渲染界面, 下载JS, 解析JS, 执行JS等
  - 功能模块: 用户界面、**渲染引擎**、**JS引擎**、存储等等
  - 上面模块一般处于不同的线程
  - 如果进程是车间，那么线程就是流水线

## JS引擎
- JS引擎距离
  - Chrome用的是V8引擎, 用C++写的
  - 网景用的是SpiderMonkey
  - Safai用的是JavaScriptCore
  - ....
- 主要功能
  - 编译: 把js代码翻译成机器能执行的字节码或机器码
  - 优化: 改写代码, 让其更高效
  - 执行: 执行上面的字节码或机器码
  - 垃圾回收: 把JS用完的内存回收, 方便之后再次使用

## 执行JS代码
- 提供API: window/document/setTimeout/...
- 以上不是JS的功能
- 我们将这些功能称作运行环境runtime env
- 一旦把JS放进页面, 就开始执行JS
- JS代码执行在内存中

## JS内存
规律
- 数据分为两种: 对象和非对象(数字, 字符串, 布尔值)
- 非对象都存在Stack区
- 对象都存在Heap区
- = 号总是会把右边的东西复制到左边(不存在什么传值和传址)

```JavaScript
var person = {} // var person = new Object()
var a = [1, 2, 3] // var a = new Array(1, 2, 3)
function f(){} // var f = new Function()
```

## JS当中变量和对象不是一个东西
例如
console变量是存在栈区stack中, 保存的是一串地址
console对象是存在堆区heap中, 只不过console变量存的地址指向了这个位置
前者是内存地址, 后者是一坨内存

## JS三座大山
1. this
2. 原型(prototype)
3. AJAX

## 原型
prototype
问题:
```JavaScript
var obj = {}
obj.toString()
```
为什么不会报错？为什么可以运行？
解答:
- obj里包含了一个隐藏属性
- 隐藏属性存储了Object.prototype对象地址
- obj.toString()发现obj上没有toString
- 就去隐藏对象对应的对象里找
- 于是就找到Object.prototype
- 只有读的时候找不到会通过隐藏对象去找, 写入不会, 所以修改obj.toString的话不会导致obj2.toString也被改变

xxx.prototype存储了xxx对象的共同属性这就是原型, 好处就是既省代码又省内存, 每一个对象都有一个隐藏属性, 指向原型
例如
```JavaScript
var a = [1, 2, 3]
var b = [3, 4, 5]
```
a, b均有一个隐藏属性指向Array.prototype
> !大写的东西不要关注隐藏属性是什么, 比如Object也是对象但是不要去关心隐藏属性是什么

隐藏属性叫什么?
`__proto__`
prototype和`__proto__`区别是什么?
都存着相同的地址, 只不过prototype挂在函数上面, 而__proto__挂在每一个新生成的对象上