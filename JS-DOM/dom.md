# dom 笔记

## html 结构可以画成一棵树

## JS 如何操作这棵树

js 是不能直接操作的, 但是 js 可以通过 document 来操作网页, 这就是 document Object Model 文档对象模型, 简称 DOM

## DOM 设计的很挫, 极其难用, 以至于要使用 jquery 来操作 DOM 后面又有 vue, react 这些框架

## 获取元素的 API

1. 一个元素如果有 id，可以直接获取到，在控制台使用 window.id 或者直接省略 window

2. document.getElementByid('idxxx');还不如用第一个，除非名字和全局的冲突了
3. document.getElementsByTagName\('div'\)\[0\];
4. document.getElementsByClassName\('red'\)\[0\];
5. 上面三个永远不要用，除非的兼容 IE
6. document.querySelector('#idxxx'); ()里面的内容可以按照 css 选择器的写法写基本都可以获取到
7. document.querySelectorAll\('red'\)\[0\];
8. 用哪一个?document.querySelector 或者 document.querySelectorAll
9. 确实就是很反人类

获取特定的标签(还是一堆反人类的玩意):

1. 获取 html 标签，使用 document.documentElement.tagName(好好的小写标签名, 返回值却是大写的)
2. 获取 head 标签，使用 document.head
3. 获取 body 标签，使用 document.body
4. 获取窗口(窗口不是元素)，使用 window
5. 获取所有元素 document.all, 这玩意是个奇葩, 第六个 falsy 值，这个玩意是 IE 发明的，所以设置成 falsy 用来判断是不是 IE 浏览器

获取的元素是一个对象,这个对象有六层原型

## 元素的六层原型链

参考代码

```javascript
let div = querySelectorAll("div")[0]; // 获取到第一个div
console.dir(div); // 打出div对象的结构
```

1. div 的原型是什么？div.\_\_proto\_\_ === HTMLDivElement.prototype
2. HTMLDivElement.\_\_proto\_\_ === HTMLElement.prototype
3. HTMLElement.\_\_proto\_\_ === Element.prototype
4. Element.\_\_proto\_\_ === Node.prototype
5. Node.\_\_proto\_\_ === EventTarget.prototype
6. EventTarget.\_\_proto\_\_ === Object.prototype

节点？元素？

节点包括以下几种

1. MDN 上有完整的描述, X.nodeType 得到一个数字
2. 1 表示元素 Element，也叫做标签 Tag
3. 3 表示文本 Text
4. 8 表示注释 Comment
5. 9 表示文档 Document
6. 11 表示文档片段 DocumentFragment
7. 记住 1，3 即可

## 节点的增删改查

### 增

- 创建一个标签节点

  ```javascript
  let div1 = document.createElement("div");
  document.createElement("style");
  document.createElement("script");
  document.createElement("li");
  ```

- 创建一个文本节点

  ```javascript
  text1 = document.createTextNode("你好");
  ```

- 标签中插入文本

  ```javascript
  div1.appendChild(text1);
  div1.innerText = "你好";
  div1.textContent = "你好";
  // 但是不可以使用div1.appendChild('你好');
  // 这里三是不同层级原型链上提供的接口或属性
  ```

- 插入到页面当中

  - 创建的标签默认处于 JS 线程中
  - 必须要把其插入到 head 或者 body 当中，才会生效
  - 或者在已经在页面当中的元素上.appendChild(div)

- 提问 appendChild 页面当中存在 div#test1 和 div#test2

  ```javascript
  let div = document.createElement("div");
  test1.appendChild(div);
  test2.appendChild(div);
  ```

  - 最终 div 会出现在哪里？
  - 会出现在 test2 当中

- 一个元素不能出现在两个地方, 除非复制一份

  ```javascript
  let div2 = div1.cloneNode(true); // true是深拷贝
  ```

### 删

- 两种方法
  - 旧方法: parentNode.removeChild(childNode)
  - 新方法: childNode.remove() 垃圾 IE 中不能用
  - 离开了 DOM 树的元素只是在页面当中删除掉了，内存中还是有的，可以再加回去

### 改

1. 改 id, div.id = 'xxx'
2. 改 class, 保留字是不可以直接用所以不能用 div.class, 要使用 div.className = 'xxx', 会覆盖, 如果要添加的话使用 += 运算符或者使用 div.classList.add('xxx')
3. 改 style, div.style = 'width: 200px; color: blue;';
4. 改 style 的一部分, div.style.width = '200px';
5. 大小写, div.style.backgroundColor = 'white'; 这是由于 js 不支持 b 中划线，如 ackground-color 所以规定去掉中划线把后面一个字母变成大写
6. 改 data-\*属性, div.dataset.x = 'xxxx';
7. 改事件处理函数:
   - div.onclick 默认为 null
   - 默认点击不会发生任何事情
   - 但是如果把 div.onclick 改为一个函数 fn
   - 那么点击 div 的时候, 浏览器就会去调用这个函数
   - 并且是这样调用的 fn.call(div, event)
   - div 会被当做 this 传进去
   - event 则包含了点击事件的所有信息, 如坐标
   - div.addEventListener 是 div.onclick 的升级版看后续的笔记

- 改文本内容:

  - div.innerText = 'xxx'
  - div.textContent = 'xxx'
  - 两者几乎没有区别

- 改 HTML 内容
  - div.innerHTML = '\<strong\> 重要内容 \</strong\>';
- 改标签
  - div.innerHTML = '' // 先清空
  - div.appendChild(div2) // 再加内容

### 读

1. div.classList / a.href
2. div.getAttribute('class') / a.getAttribute('href')
3. 两种方法都可以, 但是获取到的值可能会有细微区别

### 查

- 查爸爸: node.parentNode 或者 node.parentElement
- 查爷爷: node.parentNode.parentNode
- 查子代: node.childNodes 或者 node.children, 优先使用 children
- 查兄弟姐妹: node.parentNode.childNodes 还要排除自己
- 为什么优先使用 children, 或者问 children 和 childNodes 的区别?

  ````html
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width" />
      <title>JS Bin</title>
    </head>
    <body>
      <ul id="test">
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
    </body>
  </html>
  ``` ```javascript console.log(test.childNodes.length) // 7
  console.log(test.childNodes) console.log(test.children.length) // 3
  console.log(test.children)
  ````

  ```txt
  控制台输出
  7
  NodeList(7) [text, li, text, li, text, li, text]0: text1: li2: text3: li4: text5: li6: textlength: 7[[Prototype]]: NodeList
  3
  HTMLCollection(3) [li, li, li]0: li1: li2: lilength: 3[[Prototype]]: HTMLCollection
  ```

- 查第一个儿子 node.firstNode 最后一个儿子 node.lastNode
- 查看上个兄弟节点 node.previousSibling
- 查看下个兄弟节点 node.nextSibling
- 遍历整个 div 中的元素: 下面这个就是个树的前序遍历的递归版本

  ```javascript
  travel = (node, fn) => {
    fn(node);
    if (node.child) {
      for (let i = 0; i < node.children.length; i++) {
        travel(node.children[i]);
      }
    }
  };
  travel(div1, (node) => console.log(node));
  ```

## DOM 操作是跨线程的

浏览器具有渲染引擎和 JS 引擎，这两个引擎是处于两个线程的，互不相干

- 跨线程通信
  - 当浏览器发现 JS 在 body 里面加一个 div1 对象
  - 浏览器就会去通知渲染引擎在页面当中也加一个 div 预案尚需
  - 新增的 div 元素就是照抄 div1

## 封装 DOM

封装 DOM 其实就是自己实现给 JQuery

- 什么是封装:只暴露接口不让用户看到内部具体的细节
- 什么是接口:被封装的东西需要暴露的一些功能给外部

术语参考:

- 库

  - 把提供给其他人用的工具代码称作库
  - 比如 JQuery、Underscore

- API

  - 库暴露出来的函数或属性称作 API

- 框架
  - 库变的很大，并且要学习才能看懂
  - 那么这个库就叫做框架, 如 vue, react

### 对象风格的库应该如何封装

- 也叫做命名空间风格

  - window.dom 是我们提供的全局对象

#### 增

- dom.create(`<div>hi</div>`)用于创建节点
  ```javascript
  window.dom = {};
  dom.create = function(string) {
        const container = document.createElement('div');
        container.innerHTML = string;
        return container.childern[0];
  // 创建一个容器来容纳想要的节点
  // 由于html就是文本所以可以在div标签中给innerHTML赋值然后返回
  // 这样的方式还是会有bug因为div标签中并不能放置任意的标签
  ```
  ```javascript
  window.dom = {
    create(string) {
      const container = document.createElement("template");
      container.innerHTML = string.trim(); // 去掉字符串前后的空格
      return container.content.firstChild;
    },
  };
  // template标签当中可以放置任意的标签
  // 字符串的trim方法可以去除前后的空格
  ```
- dom.afer(node, node2) 用于新增弟弟节点
- dom.before(node, node2)用于新增哥哥节点
- dom.append(parent, child)用于新增儿子
- dom.wrap(`<div></div>`)用于新增父节点

#### 删

- dom.remove(node)删除节点
- dom.empty(parent)用于删除后代

#### 改

- dom.attr(node, 'title', ?) 用于读写属性
- dom.text(node, ?) 用于读写文本内容
- dom.html(node, ?) 用于读写 html 的内容
- dom.style(node, {color: 'red'}) 用于修改 style
- dom.class.add(node, 'blue')用于添加 class
- dom.class.remove(node, 'blue')用于删除 class
- dom.on(node, 'click', fn)用于添加事件监听
- dom.off(node, 'click', fn)用于删除事件监听

### 查

- dom.fin('选择器')用于获取标签或标签们
- dom.parent(node)用于获取父元素
- dom.childern(node)用于获取子元素
- dom.siblings(node)用于获取兄弟元素
- dom.next(node)用于获取弟弟
- dom.previous(node)用于获取哥哥
- dom.each(nodes, fn)用于遍历所有节点
- dom.index(node)用于获取排行老几
