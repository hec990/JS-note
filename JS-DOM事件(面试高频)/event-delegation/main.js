setTimeout(() => {
    const button = document.createElement('button');
    button.textContent = 'click 1';
    div1.appendChild(button);
}, 1000);

on('click', '#div1', 'button', () => {
    console.log('button 被点击了');
});

function on(eventType, element, selector, fn) {
    if (!(element instanceof Element)) {
        element = document.querySelector(element);
    }
    element.addEventListener(eventType, (e) => {
        const t = e.target;
        if (t.matches(selector)) {
            fn(e);
        };
    })
}