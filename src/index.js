import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom'


import { createStore } from "redux";
import { Provider } from "react-redux";



render(
  <BrowserRouter>
    <App />
    </BrowserRouter>,
  document.getElementById('root')
);

