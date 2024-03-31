import React from 'react';
import ReactDOM from 'react-dom'; 
import './index.css';
import App from './pages/App.tsx';
import reportWebVitals from './reportWebVitals';
import './API/emailjsAPI.ts'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
