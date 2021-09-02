let html = document.querySelector('#html');
let css = document.querySelector('#css');
let n = 0;
let str = '';
let str2 = '';

console.log('旋转的太极图');

html.innerHTML = str;

str =
    `
/* 介绍:
 * 这是一个制作旋转八卦图的小项目
 * 用来展示基本的前端基础
 * 第一步:
 *  使用id为taiji的div来放置太极
 *  首先绘制出太极的基本轮廓
 *  并且把它变成一个圆形
 */
#taiji {
    border: 1px solid red;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.7);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
}
/* 第二步:
 *  太极分成阴阳两部分底色
 *  这里实现方法可以采用包含两个子div对子div设置背景色的方案
 *  也可以采用css渐变色的方法
 *  这里使用css渐变颜色的方案
 *  使用网站cssgradient.io获取想要的半白半黑的效果
 */
#taiji {
    border: none;
    background: linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 50%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 1) 100%);
}
/* 第三步:
 *  要让黑白两部分形成阴阳鱼形状的咬合
 *  需要用到两个半径为大圆一半的圆
 *  这里实现方法可以使用两个div来制作
 *  也可以使用css伪元素来制作, 当css伪元素当中content内容时, 默认伪元素是一个span标签
 *  通过设置dispaly属性将内联标签变为块级标签
 */
#taiji::before {
    border: 1px solid red;
    content: '';
    display: block;
    position: absolute;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background: #000;
    border: none;
}
#taiji::after {
    border: 1px solid red;
    content: '';
    display: block;
    position: absolute;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    bottom: 0%;
    left: 50%;
    transform: translateX(-50%);
    background: #fff;
    border: none;
}
/* 第四步:
 * 绘制阴阳鱼对应的两个小圆
 * 这一步同样采用css渐变效果来实现
 * 具体实现方法是对两个伪元素进行内外不同的渐变
 * 这里同样也可以采用再套更里层的div去实现, 但是伪元素当中是不可以再套用伪元素的
 */ 
#taiji::before {
    background: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 25%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 1) 100%);
}
#taiji::after {
    background: radial-gradient(circle, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 25%, rgba(255, 255, 255, 1) 25%, rgba(255, 255, 255, 1) 100%);
}
/* 第五步:
 *  使用transform的rotate方法配合animation让整体转起来
 */
@keyframes rotate-360deg {
    0% {
        transform: translateX(-50%) translateY(-50%) rotate(0deg);
    }
    25% {
        transform: translateX(-50%) translateY(-50%) rotate(90deg);
    }
    50% {
        transform: translateX(-50%) translateY(-50%) rotate(180deg);
    }
    75% {
        transform: translateX(-50%) translateY(-50%) rotate(270deg);
    }
    100% {
        transform: translateX(-50%) translateY(-50%) rotate(360deg);
    }
}
#taiji {
    animation-timing-function:linear;
    animation: rotate-360deg 3000ms infinite;
}
`;

let step = () => {
    setTimeout(() => {
        str2 += str[n] === '\n' ? '<br>' : (str[n] === ' ' ? '&nbsp' : str[n]);
        html.innerHTML = str2;
        css.innerHTML = str.substring(0, n);
        html.scroll(0, 9999); // html的内容自动滚动
        if (n + 1 < str.length) {
            n += 1;
            step();
        } else {
            return undefined;
        }
    }, 0);
};

step();