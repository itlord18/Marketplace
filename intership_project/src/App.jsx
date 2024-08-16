//import { Counter } from './counter/counter'<Counter />
import { BrowserRouter } from 'react-router-dom';
import { Shop } from './shop/shop';

function App() {
  return (
    <BrowserRouter> 
      <div>
        <Shop />
      </div>
    </BrowserRouter>
  );
}

export default App;

