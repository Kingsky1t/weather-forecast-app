import { createContext, useState } from "react";

export const HistoryContext = createContext();

export const HistoryContextProvider = ({ children }) => {
  const [history, setHistory] = useState([]);
  return (
    <HistoryContext.Provider value={{ history, setHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};
