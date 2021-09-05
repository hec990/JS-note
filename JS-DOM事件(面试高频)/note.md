# DOM 事件

## 捕获和冒泡

```html
<div class="yeye">
  <div class="baba">
    <div class="erzi">文字</div>
  </div>
</div>
```

请问添加分别添加点击的监听事件 fnye,fnba,fner 触发的顺序是什么?

w3c 规定了应该同时支持两种顺序

1. 首先按照 fnye > fnba > fner 的顺序看有没有函数监听，从外到内叫做事件捕获
2. 其次按照 fner > fnba > fnye 的顺序看有没有函数监听，从内到外叫做事件冒泡
3. 开发者可以自己选择把**函数**放在事件捕获阶段(从外到内)还是放在事件冒泡阶段(从内到外)

## addEventListener

- 事件绑定 API

  - IE5: baba.attachEvent('onclick', fn); //冒泡
  - 网景: baba.addEventListener('click', fn); //捕获
  - W3C: baba.addEventListener('click', fn, bool);

- 如果 bool 不传或者为 falsy 就让 fn 走冒泡(bubbing)
- 如果 bool 为 true 则让 fn 走捕获(capture)
- 点击了儿子算不算点击了爸爸?先调用哪个监听函数?

  - 算
  - 捕获说先调用爸爸的监听函数
  - 冒泡说先调用儿子的监听函数

- W3C 事件模型

  - 先捕获再冒泡(这个说的是爸爸和儿子的关系, 同一个 div 都有捕获和冒泡时没有这种顺序)
  - 注意 e 对象传给所有的监听函数
  - 事件结束后 e 对象就不存在了
  - 冒泡可以取消, 捕获不能取消, 使用`e.stopPropagation()`取消冒泡
  - 有的事件不并指出取消:如 scroll event 滚动事件
  - 是不是可以取消能不能冒泡还是看 MDN:
    - Bubbles 表示是否支持冒泡
    - Cancelable 表示是否支持取消冒泡
  - 如何阻止滚动事件:
    - 禁用 whell 和 tuochstatr 的默认动作
    - 但是滚动条还能用, 所以还需要在 css 样式当中设置滚动条消失

- target v.s. currentTarget
  - e.target 用户操作的元素
  - e.currentTarget 代码监听的元素
  - div > span {文字}， 用户点击文字
  - e.target 就是 span
  - e.currentTarget 就是 div

## 自定义事件

自定义一个 commanEvent

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>commanEvent</title>
  </head>
  <body>
    <div id="div1">
      <button id="button1">点击触发 commonEvent 事件</button>
    </div>
  </body>
</html>
```

```javascript
button1.addEventListener("click", () => {
  const event = new CustomEvent("commonEvent", {
    detail: { name: "commonEvent" },
    Bubbles: true, // 支持冒泡
    Cancelable: false, // 不支持取消冒泡
  });
  button1.dispatchEvent(event);
});

button1.addEventListener("commonEvent", (e) => {
  console.log("自定义事件被触发");
  console.log(e);
});
```

## 事件委托

- 场景 1
  - 要给 100 个按钮(botton)添加点击事件这么办?
  - 监听这 100 个按钮的祖先(比如被包在一个 div 里面, 去监听这个 div 就好了), 然后等冒泡的时候判断 target 是不是 100 个当中的某一个
- 场景 2
  - 要监听当前不存在的元素的点击事件怎么办?
  - 监听祖先, 等点击的时候看是不是我需要的监听的元素即可
- 优点
  - 节省内存(省了监听事件的数量)
  - 可以监听动态元素

```javascript
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>事件委托</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div id="div1"></div>
    <script src="main.js"></script>
  </body>
</html>

```

```javascript
// 基本的事务委托
setTimeout(() => {
  const button = document.querySelector("button");
  button.textContent = "click 1";
  div1.appendChild(button);
}, 1000);

on("click", "#div1", "button", () => {
  console.log("button 被点击了");
});

function on(eventType, element, selector, fn) {
  if (!(element instanceof Element)) {
    element = document.querySelector(element);
  }
  element.addEventListener(eventType, (e) => {
    const t = e.target;
    if (t.matches(selector)) {
      fn(e);
    }
  });
}
```

以上的 click 是不对的, 假如使用 span 包含 click1

```html
<body>
  <div id="click1"></div>
</body>
```

```javascript
setTimeout(() => {
  const button = document.querySelector("button");
  const span = document.creatElement("span");
  button.textContent = "click 1";
  div1.appendChild(button);
}, 1000);
```

在这里点击了 click 1 实际上是点击的 span 而不是 button，应该递归的去判断，如果父类里面有一个是 button 就证明是点击的 button

```javascript
element.addEventListener(eventType, (e) => {
  let el = e.target; // 得到的button，去判断父元素
  while (!el.matches(selecotr)) {
    if (element === el) {
      el = null;
      break;
    }
    el = el.parentNode;
  }
  el && fn.call(el, e, el);
});
```

## JS 支持事件吗?

- 答:
  - 支持，不支持。DOM 事件不属于 JS 的功能，术语浏览器提供了 DOM 功能
  - JS 只是调用了 DOM 提供的 addEventListener 而已
- 追问
  - 面试官可能会要**手写一个事件系统**用来让 js 支持事件
