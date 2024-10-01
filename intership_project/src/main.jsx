import React from 'react'
import ReactDOM from 'react-dom/client'
import store from './store/store';
import { Provider } from 'react-redux';
import App from './App.jsx'
import './index.css'
import { ChakraProvider} from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
)
