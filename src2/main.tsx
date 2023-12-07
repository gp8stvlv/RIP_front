import ReactDOM from 'react-dom';
import { HashRouter, Route, Routes } from "react-router-dom";
import { Catalog } from './App';
import { EquipmentDetail } from './App';
import React from 'react';

ReactDOM.render(
  <HashRouter>
    <Routes>
      <Route path="/catalog/" element={<Catalog />} />
      <Route path="/bouquetss/:id/" element={<EquipmentDetail />} />
    </Routes>
  </HashRouter>,
  document.getElementById('root')
);