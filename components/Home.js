import { StatusBar } from "expo-status-bar";
import { Text, View, Image, TextInput, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { db } from "../firebase";
// import { collection } from "firebase/firestore/lite";
// import { getDocs } from "firebase/firestore/lite";
// import "firebase/compat/firestore";
import {
  UserIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
} from "react-native-heroicons/outline";
import Categories from "./Categories";
import FeaturedRow from "./FeaturedRow";
import React,{ useState, useEffect } from "react";
import sanityClient from '../sanity'


export default function Home() {

const[featureCategories,setFeaturedCategories]= useState([])
 

useEffect(()=>{
  sanityClient.fetch(
    `*[_type == "featured"] {
      ...,
      restaurants[]->{
        ...,
        dishes[]->
      }
    }
  `
  ).then(data=>{
    setFeaturedCategories(data)
    // setFeaturedCategories(data)
  })
},[])


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
    <SafeAreaView className="bg-white pt-5">
      {/* header */}
      <View className=" flex-row pb-3 items-center space-x-2 px-4">
        <Image
          source={{ uri: "https://links.papareact.com/wru" }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now !</Text>

          <Text className=" font-bold text-xl">
            Current Location
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>

        <UserIcon size={35} color="#00CCBB" />
      </View>

      {/* search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className=" flex-row flex-1 space-x-2 bg-gray-200 p-3">
          <MagnifyingGlassIcon size={20} color="gray" />
          <TextInput
            placeholder="Restaurants and cuisines"
            keyboardType="default"
            style={{ flex: 1, marginLeft: 10, fontSize: 16 }}
          />
        </View>
        <AdjustmentsVerticalIcon color="#00CCBB" />
      </View>

      {/*body*/}
      <ScrollView
        className="
     bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        <Categories />


{featureCategories?.map(category=>(
  <FeaturedRow
  key={category._id}
  id={category._id}
  title={category.name}
  description={category.description}
/>

))}



      
      </ScrollView>
    </SafeAreaView>
  );
}

