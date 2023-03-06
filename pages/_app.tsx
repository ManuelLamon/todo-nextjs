import { ProyectosContextProvider } from "../context/proyectos/proyectosContext";
import { SesionContextProvider } from "../context/sesion/sesionContext";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { ThemeProvider } from '@mui/material/styles';
import theme from "../utils/theme";
import '@fortawesome/fontawesome-svg-core/styles.css'; 
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SesionContextProvider>
      <ProyectosContextProvider>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Component {...pageProps} />
        </LocalizationProvider>
      </ThemeProvider>
      </ProyectosContextProvider>
    </SesionContextProvider>
  );
}
