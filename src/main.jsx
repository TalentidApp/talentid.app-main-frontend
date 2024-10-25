import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { MyProvider } from './context/UserContext.jsx'; // Importing the context provider
import { Toaster } from 'react-hot-toast';
import { Provider } from "react-redux"; // Redux Provider

import { store } from './redux/store.jsx'; // Importing store and persistor
import { PersistGate } from 'redux-persist/integration/react'; // Importing PersistGate
import { persistor } from './redux/store.jsx'; // Ensure persistor is exported from your store setup

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Wrap the app with Redux Provider */}
    <Provider store={store}>
      {/* PersistGate delays rendering until persistence is complete */}
      <PersistGate loading={null} persistor={persistor}>
        {/* Wrap the app with the custom context provider */}
        <MyProvider>
          {/* Toaster for notifications */}
          <Toaster position="top-center" />
          <App />
        </MyProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);


