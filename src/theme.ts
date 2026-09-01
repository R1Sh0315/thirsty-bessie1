import { createTheme, responsiveFontSizes, Theme } from '@mui/material/styles';

export const getAppTheme = (isDarkMode: boolean): Theme => {
  let theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: isDarkMode ? '#38bdf8' : '#0284c7',
        light: isDarkMode ? '#7dd3fc' : '#38bdf8',
        dark: isDarkMode ? '#0284c7' : '#0369a1',
        contrastText: '#ffffff',
      },
      secondary: {
        main: isDarkMode ? '#f472b6' : '#db2777',
        light: isDarkMode ? '#fbcfe8' : '#f472b6',
        dark: isDarkMode ? '#db2777' : '#9d174d',
        contrastText: '#ffffff',
      },
      background: {
        default: isDarkMode ? '#0b1120' : '#f8fafc',
        paper: isDarkMode ? '#1e293b' : '#ffffff',
      },
      text: {
        primary: isDarkMode ? '#f1f5f9' : '#0f172a',
        secondary: isDarkMode ? '#94a3b8' : '#64748b',
      },
      divider: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
    },
    typography: {
      fontFamily: '"Fredoka", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontWeight: 700 },
      h2: { fontWeight: 700 },
      h3: { fontWeight: 600 },
      h4: { fontWeight: 600 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      button: { textTransform: 'none', fontWeight: 600 },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            padding: '8px 20px',
            transition: 'all 0.25s ease-in-out',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            backgroundImage: 'none',
            border: isDarkMode
              ? '1px solid rgba(255, 255, 255, 0.08)'
              : '1px solid rgba(0, 0, 0, 0.06)',
            boxShadow: isDarkMode
              ? '0 10px 30px -10px rgba(0, 0, 0, 0.5)'
              : '0 10px 30px -10px rgba(0, 0, 0, 0.06)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 500,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
    },
  });

  return responsiveFontSizes(theme);
};
