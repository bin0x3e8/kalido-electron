import React from 'react';
import ReactDOM from 'react-dom';

import './styles.css';
import MainPage from './components/pages/mainPage/mainPage';

const App = (): JSX.Element => {
  return (
    <div>
      <MainPage />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);