import React from 'react';
import './App.scss';
import { AndroidPage } from './pages/androidPage/AndroidPage'
import { ToastProvider } from 'react-toast-notifications'


const App: React.FC = () => {
  return (
    <ToastProvider autoDismissTimeout={1500} placement='top-right' autoDismiss={true}>
      <div className="App">
        <AndroidPage />
      </div >
    </ToastProvider>
  );
}

export default App;
