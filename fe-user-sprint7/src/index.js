import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import reportWebVitals from './reportWebVitals';
// import { store } from './store/store';
import './i18n/i18n';
import { persistor, store } from './store/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import { ErrorProvider } from 'hooks/ErrorProvider';
import { QueryClient, QueryClientProvider } from 'react-query';
// import './assets/fonts/SuisseWorks-Bold-v1.woff2';
// import './assets/fonts/Udemy-Sans-Regular-v1.woff2';
// import './assets/fonts/Udemy-Sans-Bold-v1.woff2';

const container = document.getElementById('root');

import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Loading from 'components/Loading/Loading';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,
      retry: 2
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <BrowserRouter>
            <ErrorProvider>
              <App />
              <ToastContainer />
            </ErrorProvider>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
  container
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
