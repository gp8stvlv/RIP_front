/** @jsxImportSource react */
import ReactDOM from 'react-dom';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Catalog, EquipmentDetail } from './App';

const App = () => (
  <HashRouter>
    <Routes>
      <Route path="/catalog/" element={<Catalog />} />
      <Route path="/catalog/:id/" element={<EquipmentDetail />} />
    </Routes>
  </HashRouter>
);

ReactDOM.render(<App />, document.getElementById('root'));
