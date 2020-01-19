import React from 'react';
import './App.scss';
import { AndroidPage } from './pages/androidPage/AndroidPage'

const App: React.FC = () => {
  return (
    <div className="App" style={{ width: '100%' }}>
      <AndroidPage />
    </div >
  );
}

export default App;
