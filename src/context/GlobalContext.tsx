import React, { createContext } from 'react';

interface GlobalContextProps {
  theme: boolean;
  toggleTheme: () => void;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const useGlobalContext = (): GlobalContextProps => {
  const context = React.useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = React.useState<boolean>(true);

  const toggleTheme = () => {
    setTheme(() => !theme);
  };

  return (
    <GlobalContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
