import {createContext, useState } from "react";
import {RenderContextProps} from './renderInterface';

export const RenderContext = createContext({} as RenderContextProps);

export const RenderContextProvider = ({children}: any) => {
    const [loader, setLoader] = useState<boolean>(false);
    const [firstTime, setFirstTime] = useState<boolean>(false);
    const [language, setLanguage] = useState<'ES' | 'EN'>('ES');
  
    return (
      <RenderContext.Provider
        value={{
          loader,
          language,
          firstTime,
          setLoader,
          setFirstTime,
          setLanguage,
        }}>
        {children}
      </RenderContext.Provider>
    );
  };
  