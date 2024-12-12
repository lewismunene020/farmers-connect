import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "./hooks/Auth";
import AppRouter from "./Router";
const App = () => {
  return (
    <AuthContextProvider>
      <AppRouter />
    </AuthContextProvider>
  );
};

export default App;
