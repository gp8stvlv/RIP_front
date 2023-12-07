// App.tsx
import React from 'react';
import StartPage from './components/StartPage';
import ITunesPage from './components/ITunesPage';
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


const App: React.FC = () => {
  return (
    <div>
      <h1>ITunesPage</h1>
      <ITunesPage />
    </div>
  );
};


export const Catalog: React.FC = () => {
  return (
    <div>
      <h1>CatalogPage</h1>
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

export default App;

// App.tsx
// import React from 'react';
// import StartPage from './components/StartPage';
// import ITunesPage from './components/ITunesPage';
// import BasicExample from './components/navbar';

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }