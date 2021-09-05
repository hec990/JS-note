#DOM 事件模型

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
