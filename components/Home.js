import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { Button } from "react-native-paper";
import { auth } from "../firebase";
import {signOut} from "firebase/auth"

export default function Home() {

  const signOute = ()=> {
signOut(auth)
.then((data)=>{
  // envoyer false
})
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/img/victoria.jpg")}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text
            style={{ textAlign: "center", fontSize: 24, fontWeight: "bold" }}
          >
            Halal food
          </Text>
       
            <Button
              style={styles.btn}
              icon="arrow-right-bold-circle"
              mode="contained"
              onPress={signOute}
            >
              Deconexion
            </Button>
        </View>
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  btn: {
    display: "flex",
    flexDirection: "row-reverse",
  },
});
