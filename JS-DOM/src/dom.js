window.dom = {
    create(string) {
        const container = document.createElement('template');
        container.innerHTML = string.trim(); // 去掉字符串前后的空格
        return container.content.firstChild;
    },
    after(node, node2) {
        // 由于dom只支持在前面插入所以等价于在node的后面一个节点向前面插入
        node.parentNode.insertBefore(node2, node.nextSibling);
    },
    before(node, node2) {
        node.parentNode.insertBefore(node2, node);
    },
    append(parent, node) {
        parent.appendChild(node);
    },
    wrap(node, parent) {
        // 先把父节点插到parent前面
        // 再让node成为父节点的子节点
        dom.before(node, parent);
        dom.append(parent, node);
    },
    remove(node) {
        node.parent.removeChild(node);
        return node;
    },
    empty(node) {
        // 从html中移除, 但是在js中可以获取到
        // const {childNodes} = node; // 是const childNodes = node.childNodes的简写
        const array = [];
        let x = node.firstChild;
        while (x) {
            array.append(dom.remove(node.firstChild));
            x = node.firstChild;
        }
        return array;
    },
    attr(node, name, value) {
        if (arguments.length === 3) {
            node.setAttribute(name, value);
        } else if (arguments.length === 2) {
            return node.getAttribute(name);
        }
    },
    text(node, string) {
        // 适配浏览器, innerText是ie的
        if (arguments.length === 2) {
            if ('innerText' in node) {
                node.innerText = string;
            } else {
                node.textContent = string;
            }
        } else if (arguments === 1) {
            if ('innerText' in node) {
                return node.innerText;
            } else {
                return node.textContent;
            }
        }
    },
    html(node, string) {
        if (arguments === 2) {
            node.innerHTML = string;
        } else if (arguments === 1) {
            return node.innerHTML;
        }
    },
    style(node, name, value) {
        if (arguments === 3) {
            // deom.sytle(div, 'color', 'red');
            node.style[name] = value;
        } else if (arguments === 2) {
            if (typeof name === 'string') {
                return node.style[name];
            } else if (typeof name === 'object') {
                for (let key in name) {
                    node.style[key] = name[key];
                }
            }
        }
    },
    class: {
        add(node, className) {
            node.classList.add(className);
        },
        remove(node, className) {
            node.classList.remove(className);
        },
        has(node, className) {
            return node.classList.contains(className);
        }
    },
    on(node, eventName, fn) {
        node.addEventListenter(eventName, fn);
    },
    off(node, eventName, fn) {
        node.removeEventListenter(eventName, fn);
    },
    find(selector, scope) {
        return (scope || document).querySelectorAll(selector);
    },
    parent(node) {
        return node.parentNode;
    },
    child(node) {
        return node.children;
    },
    siblings(node) {
        // 把数组变成伪数组然后使用filter
        return Array.from(node.parentNode.children).filter(n=>n !== node); 
    },
    next(node) {
        // 下一个节点存在且是文本查看下一个的下一个
        if (node.nextSibling && node.nextSibling.nodeType === 3) {
            return this.next(node.nextSibling);
        } else return node.nextSibling;
    },
    pervious(node) {
        // 前一个节点存在且是文本查看下一个的下一个
        if (node.perviousSibling && node.perviousSibling === 3) {
            return this.pervious(node.perviousSibling);
        } else return node.perviousSibling;
    },
    foreach(nodeList, fn) {
        for (let i=0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i]);
        }
    },
    index(node) {
        const list = dom.children(node.parentNode);
        for (let i = 0; i < list.length; i++) {
            if (list[i] === node) {
                break;
            }
        }
        return i;
    }
};
