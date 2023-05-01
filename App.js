import React, { useContext, useEffect } from "react";
import { UserContextProvider } from "./components/context/userContext";
import Navigation from "./components/navigation/Navigation";

export default function App() {
  return (
    <UserContextProvider>
      <Navigation />
    </UserContextProvider>
  );
}
