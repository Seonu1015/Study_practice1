import './App.css';
import Hello from './components/ex01/Hello';
import Count from './components/ex01/Count';
import Address from './components/ex01/Address';
import Product from './components/ex01/Product';
import Todos from './components/ex02/Todos';
import Posts from './components/ex02/Posts';

const App = () => {
    return (
        <div className="App">
            {/* <Hello />
            <hr />
            <br />
            <Count />
            <br />
            <Count />
            <hr />
            <Address /> */}
            {/* <Product/> */}
            {/* <Todos /> */}
            <Posts />
        </div>
    );
}

export default App;
