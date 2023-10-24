import './App.css';
import Hello from './components/ex01/Hello';
import Count from './components/ex01/Count';

const App = () => {
    return (
        <div className="App">
            <h1>리액트...</h1>
            <hr />
            <Hello />
            <hr />
            <Count />
        </div>
    );
}

export default App;
