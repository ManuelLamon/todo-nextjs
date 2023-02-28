import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import type {} from '@mui/x-date-pickers/themeAugmentation';

// Create a theme instance.
const theme = createTheme({
    palette: {
      primary: {
        main: '#80BC00',
      },
      secondary: {
        main: '#C9E393',
      },
      error: {
        main: red.A400,
      },
    },
  });
  
  export default theme;