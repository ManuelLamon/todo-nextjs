import { ProyectosContextProvider } from "../context/proyectos/proyectosContext";
import { SesionContextProvider } from "../context/sesion/sesionContext";
import { RenderContextProvider } from "../context/render/renderContext";
import "react-toastify/dist/ReactToastify.css";
import "animate.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../utils/theme";
import { config } from "@fortawesome/fontawesome-svg-core";
import Loading from "../components/Loading";
import { ToastContainer } from "react-toastify";

config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RenderContextProvider> 
      <SesionContextProvider>
        <ProyectosContextProvider>
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <ToastContainer />
              <Loading />
              <Component {...pageProps} />
            </LocalizationProvider>
          </ThemeProvider>
        </ProyectosContextProvider>
      </SesionContextProvider>
    </RenderContextProvider>
  );
}
