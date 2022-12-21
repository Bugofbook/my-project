import { createTheme } from '@mui/material/styles';
// import { purple } from '@mui/material/colors'
const customTheme = createTheme({
  //   palette: {
  //     main: {
  //       main: '#FFFFFF',
  //       light: '#ffffff',
  //       dark: '#ffffff',
  //       contrastText: '#000000'
  //     },
  //     white: {
  //       main: '#FFFFFF',
  //       light: '#ffffff',
  //       dark: '#ffffff',
  //       contrastText: '#000000'
  //     }
  //   },
});
const theme = createTheme(customTheme, {
  // palette: {
  //   text: {
  //     primary: '#FFFFFF',
  //   }
  // },
    // typography: {
    //     fontSize: '16px',
    //     subtitle1: {
    //       fontSize: '18px',
    //     },
    //     body1: {
    //       fontSize: '14px',
    //     },
    // },
});

export default theme;
