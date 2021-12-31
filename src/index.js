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


const globalState = {
  idKategori: 0,
  refresh: false,
  showModal: false,
  konten: 0,
  id_tags:[]
};

// Reducer
const rootReducer = (state = globalState, action) => {
  // console.log(action)
  switch (action.type) {
    case "ARTIKEL_BY_KATEGORI":
      return {
        ...globalState,
        idKategori: action.newValuIdKategori,
      };
    case "HANDLE_PLUS":
      return {
        ...globalState,
        refresh: false,
      };
    case "SHOW_MODAL":
      return {
        ...globalState,
        showModal: true,
      };
    case "HIDE_MODAL":
      return {
        ...globalState,
        showModal: false,
      };
    case "ADD_KONTEN":
      return {
        ...globalState,
        konten: action.konten,
      };
      case "ARTIKEL_BY_TAG":
        return {
          ...globalState,
          id_tags: [action.idTag]
        }
    default:
      return state;
  }
};

// Store
const storeRedux = createStore(rootReducer);

storeRedux.subscribe(() => {
  console.log("store change : ", storeRedux.getState());
});


render(
  <BrowserRouter>
    <Provider store={storeRedux}>
    <App />
    </Provider>
    </BrowserRouter>,
  document.getElementById('root')
);

