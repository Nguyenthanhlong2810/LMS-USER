import { createTheme } from '@mui/material/styles';
import { viVN } from '@mui/material/locale';
export const theme = createTheme(
  {
    typography: {
      fontFamily: [
        'IBM Plex Sans',
        'sans-serif'

        // '-apple-system',
        // 'BlinkMacSystemFont',
        // 'Segoe UI',
        // 'Roboto',
        // 'Helvetica Neue',
        // 'Arial',
        // 'Noto Sans',
        // 'sans-serif',
        // 'Apple Color Emoji',
        // 'Segoe UI Emoji',
        // 'Segoe UI Symbol',
        // 'Noto Color Emoji'
      ].join(',')
    },
    palette: {
      primary: { main: '#1FBDF8', contrastText: '#fff' },
      error: { main: '#FF647C', contrastText: '#fff' },
      secondary: { main: '#55C763', contrastText: '#fff' },
      success: { main: '#55C763', contrastText: '#fff' },
      yellow: { main: '#FFD93D' },
      neutral: {
        main: '#565771',
        contrastText: '#fff'
      }
    },
    components: {
      MuiFormLabel: {
        styleOverrides: {
          asterisk: {
            color: '#db3131'
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: () => ({
            boxShadow: 'none',
            fontWeight: 500,
            fontSize: '14px',
            textTransform: 'none'
          })
        }
      },
      MuiCard: {
        styleOverrides: {
          root: () => ({
            boxShadow: 'none'
          })
        }
      },
      MuiInputBase: {
        styleOverrides: {
          input: () => ({
            padding: '8.5px 14px !important'
          })
        }
      },
      MuiTablePagination: {
        styleOverrides: {
          input: () => ({
            padding: '0 6px 0 0 !important'
          })
        }
      },
      MuiCardContent: {
        styleOverrides: {
          root: () => ({
            '&:last-child': {
              paddingBottom: '0'
            }
          })
        }
      }
    }
  },
  viVN
);
