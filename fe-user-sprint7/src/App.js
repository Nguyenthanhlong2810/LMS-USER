import React, { Suspense, useEffect } from 'react';
import { AppRoutes } from './routes';
import Loading from './components/Loading/Loading';
import './styles/styles.scss';
import { theme } from './themes';
import { ThemeProvider } from '@mui/material/styles';
import { LoadingProvider } from 'hooks/LoadingProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DialogProvider } from 'hooks/DialogProvider';
import { fetchUser } from 'store/thunk/userThunk';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    window.addEventListener('storage', (e) => {
      if (e.key === 'LMS_TOKEN' && e.newValue) {
        dispatch(fetchUser());
      }
    });
  });
  return (
    <div className="App">
      <LoadingProvider>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Suspense fallback={<Loading />}>
              <DialogProvider>
                <AppRoutes />
              </DialogProvider>
            </Suspense>
          </LocalizationProvider>
        </ThemeProvider>
      </LoadingProvider>
    </div>
  );
}

export default App;
