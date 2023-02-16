## 组件复用
### 1.mixins
```js
//react v15之前的方式
/**
借助createReatcClass ,mixins([])属性，将重复逻辑写成一个mixin,传入mixins数组，用来复用mixin的一些方法，包括生命周期函数
*/
```
### 2.HOC

```js
//高阶组件 一个函数 接受一个组件，返回新组件,react-redux 之前流行的写法 connect()

```

### 3.Render Props

```jsx
//例如将某个请求封装
class Fetch extends React.Component{
    state = {       // 初始化 state
        isLoaded: false,
        data: null,
    }
    componentDidMount(){
        // url 是我们为这个组件传入的值
        fetch(this.props.url)
            .then(json => json.json())
            .then(data => {
                this.setState({
                    isLoaded: true,
                    data,
                });
            });
    }
    render(){
        if(!this.state.isLoaded){
            return <h1>Loading...</h1>
        }else{
            // 给 props.render 传入请求到的数据
            // props.render 应返回一个 jsx 或组件
            return this.props.render(this.state.data);
        }
    }
}   
import Fetch from "./Fetch";

function List({item}){
    return <p >{item.name} --- {item.label}</p>
}

class App extends Component{
    render(){
        return (
            <div>
                {/* 给 Fetch 组件传入 url 和 render 函数，render函数就像一个回调函数 */}
                {/* render 函数内部渲染数据 */}
                <Fetch
                    url="/api/fruits"
                    render={(data) => data.map((item, idx) => <List item={item} key={idx} />)}
                ></Fetch>
            </div>
        );
    
}

```

### 4.hook

```jsx
const useFetch = () =>{
    const [state,_] = useState()
    useEffect(()=>{
     const data = await fetch()
     
	},[])
    return state
}
```



