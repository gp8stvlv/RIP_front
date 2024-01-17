// App.tsx
import React from 'react';
import StartPage from './components/StartPage';
import BasicExample from './components/navbar';
import CatalogPage from './components/CatalogPage';
import EquipmentDetailPage from './components/EquipmentDetailPage';


export const Navbar: React.FC = () => {
  return (
    <div>
      <h1>Мое React-приложение</h1>
      <BasicExample />
    </div>
  );
};

export const Start: React.FC = () => {
  return (
    <div>
      <h1>Мое React-приложение</h1>
      <StartPage />
    </div>
  );
};



export const Catalog: React.FC = () => {
  return (
    <div>
      <CatalogPage />
    </div>
  );
};

export const EquipmentDetail: React.FC = () => {
  return (
    <div>
      <h1>EquipmentDetailPage</h1>
      <EquipmentDetailPage />
    </div>
  );
};

export default Catalog;
