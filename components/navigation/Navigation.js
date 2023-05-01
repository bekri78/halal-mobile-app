import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import LoginScreen from "../screens/LoginScreen";
import Home from'../Home'
import RestoHome from "../restoHome";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const { currentUser } = useContext(UserContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {currentUser? (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Resto" component={RestoHome} />
          </>
        ):(

          
          <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
          />
          )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}


  