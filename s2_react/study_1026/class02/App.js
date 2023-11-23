import './App.css';
import { Row, Col } from 'react-bootstrap'
import RouterPage from './components/ex03/RouterPage';

const App = () => {
    return (
        <div className="App">
            <Row>
                <Col>
                    <RouterPage/>
                </Col>
            </Row>
        </div>
    );
}

export default App;
