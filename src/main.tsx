import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from "react-redux";
import './index.css'
import 'primeicons/primeicons.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from "./rootReducer.ts";
// import { Middleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import mySaga from './sagas';
const sagaMiddleware = createSagaMiddleware();

const errorLogger = (store: any) => (next: any) => (action: any) => {
  // eslint-disable-next-line no-useless-catch
  try {
    return next(action);
  } catch(error) {
    // log the error/send to analytics/crashlytics/etc
    throw error;
  }
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware: any) => 
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false
    }).concat(sagaMiddleware, errorLogger),
});

sagaMiddleware.run(mySaga);

export default store;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
