import './App.css';
import Hello from './components/ex01/Hello';
import Count from './components/ex01/Count';
import Address from './components/ex01/Address';
import Product from './components/ex01/Product';

const App = () => {
    return (
        <div className="App">
            <h1>리액트...</h1>
            <hr />
            {/* <Hello />
            <hr />
            <br />
            <Count />
            <br />
            <Count />
            <hr />
            <Address /> */}
            <Product/>
        </div>
    );
}

export default App;
