# jQuery 笔记

jQuery 是目前使用最广泛的 javascript 函数库。

1. [使用方式](#使用方式)
2. [封装 jQuery 以及设计思想分析](#封装-jquery-以及设计思想分析)

## 使用方式

### 选择网页元素

jQuery 使用特殊的不需要 new 操作符的构造函数 jQuery(简写成$)，参数给一个选择表达式，然后得到被选中的元素。

其中参数可以是:

1. css 选择器

```javascript
$(document); //选择整个文档对象

$("#myId"); //选择ID为myId的网页元素

$("div.myClass"); // 选择class为myClass的div元素

$("input[name=first]"); // 选择name属性等于first的input元素
```

2. jQuery 特有的表达式

```javascript
$("a:first"); //选择网页中第一个a元素

$("tr:odd"); //选择表格的奇数行

$("#myForm :input"); // 选择表单中的input元素

$("div:visible"); //选择可见的div元素

$("div:gt(2)"); // 选择所有的div元素，除了前三个

$("div:animated"); // 选择当前处于动画状态的div元素
```

### 改变结果集

jQuery 的第二个**核心**内容，强大的过滤器，用来筛选结果，缩小选择范围

```javascript
$("div").has("p"); // 选择包含p元素的div元素

$("div").not(".myClass"); //选择class不等于myClass的div元素

$("div").filter(".myClass"); //选择class等于myClass的div元素

$("div").first(); //选择第1个div元素

$("div").eq(5); //选择第6个div元素
```

同时提供一些接口方便可以从当前的结果集合出发，移动到附近的相关元素

```javascript
$("div").next("p"); //选择div元素后面的第一个p元素

$("div").parent(); //选择div元素的父元素

$("div").closest("form"); //选择离div最近的那个form父元素

$("div").children(); //选择div的所有子元素

$("div").siblings(); //选择div的同级元素
```

### 链式操作

jQuery 设计思想之三，就是最终选中网页元素以后，可以对它进行一系列操作，并且所有操作可以连接在一起，以链条的形式写出来。它的原理在于每一步的 jQuery 操作，返回的都是一个 **jQuery** 对象，所以不同操作可以连在一起。

```javascirpt
　$('div').find('h3').eq(2).html('Hello');
```

分解后:

```javascript
$("div") //找到div元素
  .find("h3") //选择其中的h3元素
  .eq(2) //选择第3个h3元素
  .html("Hello"); //将它的内容改为Hello
```

jQuery 还提供了.end()方法，使得结果集可以后退一步:

```javascript
$("div")
  .find("h3")
  .eq(2)
  .html("Hello")
  .end() //退回到选中所有的h3元素的那一步
  .eq(0) //选中第一个h3元素
  .html("World"); //将它的内容改为World
```

### 元素的操作

- 取值和赋值:
  使用同一个函数，来完成取值（getter）和赋值（setter），即"取值器"与"赋值器"合一。到底是取值还是赋值，由函数的参数决定。需要注意的是，如果结果集包含多个元素，那么赋值的时候，将对其中所有的元素赋值；取值的时候，则是只取出第一个元素的值（.text()例外，它取出所有元素的 text 内容）。

  ```javascript
  $("h1").html(); //html()没有参数，表示取出h1的值
  $("h1").html("Hello"); //html()有参数 Hello，表示对 h1 进行赋值
  // 常见值如下
  .html() //取出或设置html内容
  .text() //取出或设置 text 内容
  .attr() //取出或设置某个属性的值
  .width() //取出或设置某个元素的宽度
  .height() //取出或设置某个元素的高度
  .val() //取出某个表单元素的值
  ```

- 移动:
  提供两组方法，来操作元素在网页中的位置移动。一组方法是直接移动该元素，另一组方法是移动其他元素，使得目标元素达到我们想要的位置。假定我们选中了一个 div 元素，需要把它移动到 p 元素后面。

```javascript
$("div").insertAfter($("p")); //把 div 元素移动 p 元素后面
$("p").after($("div")); //把 p 元素加到 div 元素前面
```

> 它们有一个重大差别，那就是返回的元素不一样。第一种方法返回 div 元素，第二种方法返回 p 元素。你可以根据需要，选择到底使用哪一种方法。

> 一共有四对操作方法

```javascript
    //在现存元素的外部，从后面插入元素
　　.insertAfter()
    .after()

    //在现存元素的外部，从前面插入元素
　　.insertBefore()
    .before()

    //在现存元素的内部，从后面插入元素
　　.appendTo()
    .append()

    //在现存元素的内部，从前面插入元素
　　.prependTo()
    .prepend()
```

- 复制、删除和创建
  - 复制用 .clone()
  - 删除用 .remove()和.detach()两者的区别在于，前者不保留被删除元素的事件，后者保留，有利于重新插入文档时使用
  - 清空元素内容（但是不删除该元素）使用.empty()
  - 创建就直接把元素传入构造函数就好了

### 工具方法

除了对选中的元素进行操作以外，还提供一些与元素无关的工具方法（utility）。不必选中元素，就可以直接使用这些方法。常用的一些方法

```javascript
　　$.trim() //去除字符串两端的空格。

　　$.each() //遍历一个数组或对象。

　　$.inArray() //返回一个值在数组中的索引位置。如果该值不在数组中，则返回-1。

　　$.grep() //返回数组中符合某种标准的元素。

　　$.extend() //将多个对象，合并到第一个对象。

　　$.makeArray() //将对象转化为数组。

　　$.type() //判断对象的类别（函数对象、日期对象、数组对象、正则对象等等）。

　　$.isArray() //判断某个参数是否为数组。

　　$.isEmptyObject() //判断某个对象是否为空（不含有任何属性）。

　　$.isFunction() 判断某个参数是否为函数。

　　$.isPlainObject() 判断某个参数是否为用"{}"或"new Object"建立的对象。

　　$.support() 判断浏览器是否支持某个特性。
```

### 事件操作

把事件直接绑定在网页元素之上

```javascript
$("p").click(function () {
  alert("Hello");
});
```

主要支持的事件

```javascript
　　.blur() 表单元素失去焦点。

　　.change() 表单元素的值发生变化

　　.click() 鼠标单击

　　.dblclick() 鼠标双击

　　.focus() 表单元素获得焦点

　　.focusin() 子元素获得焦点

　　.focusout() 子元素失去焦点

　　.hover() 同时为mouseenter和mouseleave事件指定处理函数

　　.keydown() 按下键盘（长时间按键，只返回一个事件）

　　.keypress() 按下键盘（长时间按键，将返回多个事件）

　　.keyup() 松开键盘

　　.load() 元素加载完毕

　　.mousedown() 按下鼠标

　　.mouseenter() 鼠标进入（进入子元素不触发）

　　.mouseleave() 鼠标离开（离开子元素不触发）

　　.mousemove() 鼠标在元素内部移动

　　.mouseout() 鼠标离开（离开子元素也触发）

　　.mouseover() 鼠标进入（进入子元素也触发）

　　.mouseup() 松开鼠标

　　.ready() DOM加载完成

　　.resize() 浏览器窗口的大小发生改变

　　.scroll() 滚动条的位置发生变化

　　.select() 用户选中文本框中的内容

　　.submit() 用户递交表单

　　.toggle() 根据鼠标点击的次数，依次运行多个函数

　　.unload() 用户离开页面
```

以上这些事件在 jQuery 内部，都是.bind()的便捷方式。使用.bind()可以更灵活地控制事件，比如为多个事件绑定同一个函数

```javascript
$("input").bind(
  "click change", //同时绑定click和change事件
  function () {
    alert("Hello");
  }
);
```

有时，你只想让事件运行一次，这时可以使用.one()方法

```javascript
$("p").one("click", function () {
  alert("Hello"); //只运行一次，以后的点击不会运行
});
```

.unbind()用来解除事件绑定` $('p').unbind('click');`

所有的事件处理函数，都可以接受一个事件对象（event object）作为参数，比如下面例子中的 e

```javascript
$("p").click(function (e) {
  alert(e.type); // "click"
});
```

这个事件对象有一些很有用的属性和方法

```javascript
event.pageX; //事件发生时，鼠标距离网页左上角的水平距离
event.pageY; //事件发生时，鼠标距离网页左上角的垂直距离
event.type; //事件的类型（比如click）
event.which; //按下了哪一个键
event.data; //在事件对象上绑定数据，然后传入事件处理函数
event.target; //事件针对的网页元素
event.preventDefault(); //阻止事件的默认行为（比如点击链接，会自动打开新页面）
event.stopPropagation(); //停止事件向上层元素冒泡
```

### jQuery 中文 API

[jQuery 中文文档](https://www.jquery123.com/)

---

## 封装 jQuery 以及设计思想分析

- 使用 jQuery 构造的对象

  1. 这里 jQuery 是一个函数
  2. 返回的是一个 jQuery 对象而不是 elements
  3. 通过 addClass 访问外部变量 elements 就叫做闭包，这样也实现了 js 的封装，避免外部使用接口的人直接操作 elements

  ```javascript
  window.jQuery = function (selector) {
    const elements = document.querySelectorAll(selector);
    // api 可以操作 elements
    const api = {
      addClass(className) {
        for (let i = 0; i < elements.length; i++) {
          elements[i].classList.add(className);
        }
        return undefined;
      },
    };
    return api;
  };
  ```

  ```javascript
  // es6的新语法
  {
    "key" : value,
    "addClass": function(){},
    // es6的简写方式
    addClass() {}
  }
  ```

- 实现链式操作
  1. addClass 可以再访问 api(即与构造函数返回的是一样的 jQuery 对象)
  2. 这样就可以实现链式操作 jQuery('.xxx').addClass('xxx').addClass('yyy');
  3. 当然实际实现的时候肯定是不会使用 api 的
  4. 这里的 api 就应该是 this, 调度 addClass 的应该是一个 jQuery 对象, 因此返回的值也需要是一个 jQuery 对象, 那么 xxx.addClass('yyy')===xxx.addClass.call(xxx, 'yyy')
  5. 直接返回这个对象，干掉了要声明 api 对象的这一步
  ```javascript
  window.jQuery = function (selector) {
    const elements = document.querySelectorAll(selector);
    return {
      addClass(className) {
        for (let i = 0; i < elements.length; i++) {
          elements[i].classList.add(className);
        }
        return this;
      },
    };
  };
  ```
- jQuery 是构造函数吗?

  1. 是构造函数，确实构造对象
  2. 不是，因为没有使用 new 运算符
  3. 所以这里可以说 jQuery 是一个不需要 new 运算符的构造函数

- 实现 find()

  1. elements 是通过 document.querySelectorAll()返回的一个伪数组对象
  2. 一个通过遍历伪数组来查找想要的选择器
  3. 需要一个中间数组来存储元素
  4. 返回数组
  5. 但是这样就破坏了链式结构

  ```javascript
  window.jQuery = function (selector) {
    const elements = document.querySelectorAll(selector);
    return {
      addClass(className) {
        for (let i = 0; i < elements.length; i++) {
          elements[i].classList.add(className);
        }
        return this;
      },
      find(selector) {
        let arr = [];
        for (let i = 0; i < elements.length; i++) {
          arr = arr.concat(Array.from(elements[i].querySelectorAll(selector)));
        }
        return arr;
      },
    };
  };
  ```

  6. 这里的处理方式是使用 javascript 的重载，不同于 c++可以通过类型来重复声明同名的函数达到重载，js 只能在进入函数后再判断参数的类型
  7. 因此 find()函数的返回值应该任然是一个 jQuery 对象，这个对象还是使用 jQuery 函数来构造

  ```javascript
  window.jQuery = function (selectorOrArray) {
    let elements;
    if (typeof selectorOrArray === 'string') {
        elements = document.querySelectorAll(selectorOrArray);
    } else if (selectorOrArray instanceof Array) {
        elements = selectorOrArray;
    }
    return {
        addClass(className) {
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.add(className);
            }
            return this;
        },
        find(selector) {
            let arr = [];
            for (let i = 0; i < elements.length; i++) {
                arr = arr.concat(Array.from(elements[i].querySelectorAll(selector)));
            }
            return jQuery(arr);
        }
    };
  ```

- 实现 end()放回到上一层 api，each(fn)遍历调用函数 fn

  ```javascript
  window.jQuery = function (selectorOrArray) {
    let elements;
    if (typeof selectorOrArray === "string") {
      elements = document.querySelectorAll(selectorOrArray);
    } else if (selectorOrArray instanceof Array) {
      elements = selectorOrArray;
    }
    return {
      addClass(className) {
        for (let i = 0; i < elements.length; i++) {
          elements[i].classList.add(className);
        }
        return this;
      },
      find(selector) {
        let arr = [];
        for (let i = 0; i < elements.length; i++) {
          arr = arr.concat(Array.from(elements[i].querySelectorAll(selector)));
        }
        arr.oldApi = this; // this就是旧的api
        return jQuery(arr);
      },
      oldApi: selectorOrArray.oldApi,
      end() {
        return this.oldApi;
      },
    };
  };
  ```

- 实现$代表jQuery`window.$ = window.jQuery = function() {}`
- 对象的命名风格问题, 我们默认对象名为$开头的对象是 jQuery 对象, 例如`const $div = jQuery('div')`

- 使用原型
  1. 到目前为止我们自己封装的 jQuery 有一个很大的问题, 就是没有使用原型
  2. 我们声明的 jQuery 是一个函数
  3. 如同 addClass 这些均是 jQuery 这个函数当中的'key': value
  4. 由于 js 的内存模型也就是我们每创建一份 jQuery 就会创建一个 addClass 函数
  5. 但是这些函数内部全部都是一样的
  6. 这种情况下浪费了大量的内存，应该把这些函数都挂到原型链上去
  7. 要使得我们创造的 jQuery 对象符合 js 公式即 api1.\_\_proto\_\_ === jQuery.prototype
  8. 函数全部放到原型上面后函数就无法通过闭包的方式访问 elements 了，因为这时已经出了 elements 的作用域了
  9. 因此需要再返回的对象上再挂上 elements 和 oldApi 方便使用 this 来调用 elements 和 oldApi
  ```javascript
  window.$ = window.jQuery = function (selectorOrArray) {
    let elements;
    if (typeof selectorOrArray === "string") {
      elements = document.querySelectorAll(selectorOrArray);
    } else if (selectorOrArray instanceof Array) {
      elements = selectorOrArray;
    }
    oldApi: selectorOrArray.oldApi;
    // const api = {__proto__ : jQuery.prototype};
    // 但是jQuery由不希望直接这样写
    const api = Object.create(jQuery.prototype); // 创建一个对象使得这个对象.__proto__为括号里面的内容
    Object.assign(api, {
      elements: elements,
      oldApi: selectorOrArray.oldApi,
    });
  };
  // jQuery又觉得prototype太长了, 于是又起了个别名叫做fn
  jQuery.fn = jQuery.prototype = {
    jquery: true,
    // constructor: jQuery
    get(index) {
      return this.elements;
    },
    addClass(className) {
      for (let i = 0; i < this.elements.length; i++) {
        this.elements[i].classList.add(className);
      }
      return this;
    },
    find(selector) {
      let arr = [];
      for (let i = 0; i < this.elements.length; i++) {
        arr = arr.concat(
          Array.from(this.elements[i].querySelectorAll(selector))
        );
      }
      arr.oldApi = this; // this就是旧的api
      return jQuery(arr);
    },
    each(fn) {
      for (let i = 0; i < this.elements.length; i++) {
        return fn.call(null, this.elements[i], i);
      }
    },
    end() {
      return this.oldApi;
    },
  };
  ```
