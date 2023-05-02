import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { Button } from "react-native-paper";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore/lite";
import "firebase/compat/firestore";

export default function Home() {
 

  const getRestaurantsProches = async () => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAP_API;
    const origin = [48.9386186, 2.3727877];
    const maxDistance = 20000; // distance maximale en mètres
    const mode = "driving"; // mode de transport (voiture)
    const snapshot = await getDocs(collection(db, "restaurants"));

    // Filtrer les restaurants en fonction de la distance en voiture
    const results = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const data = doc.data();
        const { Restaurants } = data;

        const restaurantsResults = await Promise.all(
          Restaurants.map(async (restaurant) => {
            const destination = `${restaurant.GPS.latitude},${restaurant.GPS.longitude}`;
            const cors = "https://api.allorigins.win/get?url=";
            const url = `https://maps.googleapis.com/maps/api/distancematrix/json?key=${apiKey}&origins=${origin}&destinations=${destination}&mode=${mode}`;
            const encodedEndpoint = encodeURIComponent(url);
            try {
              const response = await fetch(`${cors}${encodedEndpoint}`);
              const json = await response.json();
              const contents = JSON.parse(json.contents);
              //console.log(contents.rows[0]['elements'][0])

              const { distance, duration } = contents.rows[0]["elements"][0];
              console.log(distance.value);
              if (distance.value <= maxDistance) {
                return {
                  id: doc.id,
                  name: restaurant.Nom,
                  distance: distance.value,
                  duration: duration.value,
                };
              }
            } catch (error) {
              console.error(error);
            }
          })
        );

        const filteredResults = restaurantsResults.filter(Boolean);
        return filteredResults;
      })
    );

    // Concaténer les résultats de tous les restaurants
    const allResults = results.flat();

    // Trier les restaurants par distance en voiture croissante
    const sortedResults = allResults.sort((a, b) => a.distance - b.distance);

    console.log(sortedResults);
  };

  const getData = async () => {
    const allRestaurants = collection(db, "restaurants");
    const restoSnapshot = await getDocs(allRestaurants);
    const restoList = restoSnapshot.docs.map((doc) => doc.data());
    console.log(restoList);
  };

  const signOute = () => {
    signOut(auth);
  };

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
          <Button
            style={styles.btn}
            icon="arrow-right-bold-circle"
            mode="contained"
            onPress={getData}
          >
            Get data
          </Button>

          <Button
            style={styles.btn}
            icon="arrow-right-bold-circle"
            mode="contained"
            onPress={getRestaurantsProches}
          >
            resto proche
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
