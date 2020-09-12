import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {BrowserRouter} from 'react-router-dom';
import {SocketManager} from './components/SocketManager';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <SocketManager>
        <App />
      </SocketManager>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
