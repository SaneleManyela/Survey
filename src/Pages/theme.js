import { createTheme } from '@mui/material/styles';
import { orange, deepPurple, grey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: orange[700], // A vibrant orange/amber for primary actions
      light: orange[300],
      dark: orange[900],
      contrastText: '#fff',
    },
    secondary: {
      main: deepPurple[500], // Deep purple for secondary elements
      light: deepPurple[300],
      dark: deepPurple[700],
      contrastText: '#fff',
    },
    background: {
      default: grey[50], // Very light grey for main page background, emulating the ad's background
      paper: '#fff',     // White for card/paper backgrounds
    },
    text: {
      primary: grey[900], // Dark grey for general text
      secondary: grey[700],
    },
  },
  typography: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: deepPurple[700], // Use a darker purple for main titles
      borderBottom: `2px solid ${deepPurple[100]}`,
      paddingBottom: 10,
      marginBottom: 20,
    },
    h2: {
      fontSize: '1.8rem',
      fontWeight: 600,
      color: orange[700], // Use orange for section titles
      marginTop: 30,
      paddingBottom: 5,
      borderBottom: `1px dashed ${orange[100]}`,
      marginBottom: 20,
    },
    body1: {
      lineHeight: 1.6,
    },
  },
  components: {
    MuiRadio: {
      styleOverrides: {
        root: {
          color: deepPurple[400], // Default color for unchecked radio
          '&.Mui-checked': {
            color: orange[700], // Color when checked
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          marginTop: 20,
          backgroundColor: orange[700],
          '&:hover': {
            backgroundColor: orange[800],
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: 20,
          marginBottom: 30,
        },
      },
    },
  },
});

export default theme;
