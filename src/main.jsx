import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ModelingsDetailsPage from './components/ModelingsDetailsPage.jsx';
import MainPage from './components/MainPage.jsx';
import AuthorizationPage from './components/AuthorizationPage.jsx';
import Logout from './components/Logout.jsx';
import RegistrationPage from './components/RegistrationPage.jsx';
import ApplicationsPage from './components/ApplicationsPage.jsx'
import Bucket from './components/Bucket.jsx'
import Catalog from './components/Catalog.jsx'


import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';

const base_path = '/'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router basename={base_path}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="catalog/" element={<Catalog />} />
          <Route path="catalog/:id/" element={<ModelingsDetailsPage />} />
          <Route path="login/" element={<AuthorizationPage />} />
          <Route path="logout/" element={<Logout />} />
          <Route path="registration/" element={<RegistrationPage />} />
          <Route path="catalog/applications/:id" element={<Bucket />} />
          <Route path="catalog/applications/" element={<ApplicationsPage />} />


        </Routes>
        <ToastContainer position="top-right" autoClose={1000} />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
