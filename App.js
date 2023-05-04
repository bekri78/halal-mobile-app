import React, { useContext, useEffect } from "react";
import { UserContextProvider } from "./components/context/userContext";
import Navigation from "./components/navigation/Navigation";
import urlPolyfill from 'react-native-url-polyfill/auto';


export default function App() {
  return (
    <UserContextProvider>
      <Navigation />
    </UserContextProvider>
  );
}
