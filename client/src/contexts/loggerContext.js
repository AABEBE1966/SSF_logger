import React, { createContext, useContext, useMemo, useState } from "react";

const LoggerContext = createContext({});
const { Provider, Consumer } = LoggerContext;

const LoggerProvider = ({ children, ...props }) => {
  const [loggerDetails, setLoggerDetails] = useState({});

  const loggerProviderValue = useMemo(
    () => ({ loggerDetails, setLoggerDetails }),
    [loggerDetails, setLoggerDetails]
  );

  return (
    <Provider value={loggerProviderValue} {...props}>
      {children}
    </Provider>
  );
};

const useLoggerContext = () => {
  const state = useContext(LoggerContext);
  if (state === undefined) {
    throw new Error("useAdminContext must be called within AdminProvider");
  }

  return {
    ...state,
  };
};

export { LoggerProvider, Consumer as loggerConsumer, useLoggerContext };

export default LoggerContext;
