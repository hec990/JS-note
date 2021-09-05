window.$ = window.jQuery = function (selectorOrArray) {
    let elements;
    if (typeof selectorOrArray === 'string') {
        elements = document.querySelectorAll(selectorOrArray);
    } else if (selectorOrArray instanceof Array) {
        elements = selectorOrArray;
    }
    oldApi: selectorOrArray.oldApi
    // const api = {__proto__ : jQuery.prototype};
    // 但是jQuery由不希望直接这样写
    const api = Object.create(jQuery.prototype); // 创建一个对象使得这个对象.__proto__为括号里面的内容
    Object.assign(api, {
        elements: elements,
        oldApi: selectorOrArray.oldApi
    });
}
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
            arr = arr.concat(Array.from(this.elements[i].querySelectorAll(selector)));
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
    }
}