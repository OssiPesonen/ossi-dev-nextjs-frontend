import React from 'react';

// Packages
import { Provider } from 'react-redux';

// Redux
import store from '@/store/store';

// UI
import '@/assets/css/bootstrap/scss/bootstrap-grid.css';
import '@/assets/css/style.css';

const App = ({ Component, pageProps }) => {
  
  return (
    <Provider store={ store }>
      <Component { ...pageProps } />
    </Provider>
  );
};

export default App;
