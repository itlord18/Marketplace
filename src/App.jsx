//import { Counter } from './counter/counter'<Counter />
import { BrowserRouter } from 'react-router-dom';
import { Shop } from './shop/shop';
import React from 'react';

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

