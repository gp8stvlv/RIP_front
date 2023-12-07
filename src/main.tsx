import ReactDOM from 'react-dom';
import { HashRouter, Route, Routes } from "react-router-dom";
import { Catalog } from './App';
import { EquipmentDetail } from './App';

ReactDOM.render(
  <HashRouter>
    <Routes>
      <Route path="/bouquetss/" element={<Catalog />} />
      <Route path="/bouquetss/:id/" element={<EquipmentDetail />} />
    </Routes>
  </HashRouter>,
  document.getElementById('root')
);