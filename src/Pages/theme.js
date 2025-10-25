import { createTheme } from '@mui/material/styles';
import { orange, deepPurple, grey, blue } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: orange[700],
      light: orange[300],
      dark: orange[900],
      contrastText: '#fff',
    },
    secondary: {
      main: deepPurple[500],
      light: deepPurple[300],
      dark: deepPurple[700],
      contrastText: '#fff',
    },
    background: {
      default: grey[50],
      paper: '#fff',
    },
    text: {
      primary: blue[900],
      secondary: grey[700],
    },
  },
  typography: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: deepPurple[700],
      borderBottom: `2px solid ${deepPurple[100]}`,
      paddingBottom: 10,
      marginBottom: 20,
    },
    h2: {
      fontSize: '1.8rem',
      fontWeight: 600,
      color: orange[700],
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
          color: deepPurple[400],
          '&.Mui-checked': {
            color: orange[700],
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          marginTop: 20,
          backgroundColor: orange[700],
          color: '#000', // Black text for all buttons
          fontWeight: 600, // Bold text globally
          '&:hover': {
            backgroundColor: orange[800],
            color: '#000', // Keep hover text black
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
