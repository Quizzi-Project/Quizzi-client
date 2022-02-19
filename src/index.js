import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import ReactRouter from './Router/router';

import httpService from './Services/httpService';

console.log('we are runing in', httpService.getUrl()); // TODO: remove log
console.log('(process.env.NODE_ENV', process.env.NODE_ENV); // TODO: remove log

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <ReactRouter />
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
