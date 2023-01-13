## transition 和 animation 区别
```js
都随时间改变元素属性值
transition 需要触发事件才会随时间变化改变css
animation 不需要触发事件
```
## 回流 和 重绘
> 1.当Render Tree中部分或全部元素的尺寸、结构、或某些属性发生改变时，浏览器重新渲染部分或全部文档的过程称为回流。

> 2.当页面中元素样式的改变并不影响它在文档流中的位置时（例如：color、background-color、visibility等），浏览器会将新样式赋予给元素并重新绘制它，这个过程称为重绘。
## display:none 和  visibility: hidden
```js
1. display:none 元素不再占用空间,会触发reflow（回流），进行渲染。
2. visibility: hidden 使元素在网页上不可见，但仍占用空间,只会触发repaint（重绘），因为没有发现位置变化，不进行渲染。
```
## css 新特性
> :has()选择器也可以叫做父类选择器，它接受一个选择器组作为参数。有了它，我们可以给有匹配子元素的父类应用一些样式
``` 
a:has(span) // 只会匹配包含 span 子元素的 a 元素
> CSS容器查询说的是CSS container，其中存在一个@contianer规则，该规则可以实时匹配指定容器元素的大小，开发者可以根据不同的大小范围去编写不同的样式；

>媒体查询的语法优化
```