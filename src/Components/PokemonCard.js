import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import { StyleSheet } from "react-native";
import { Entypo } from '@expo/vector-icons';


function PokemonCard({navigation, pokemon}) {
  const id = pokemon.url.slice(34, -1);
  return (
    <Pressable onPress={() => navigation.navigate("DetailScreen", {id: id, name: pokemon.name})} style={styles.card}>
      <Image
        style={styles.image}
        source={{
          uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${pokemon.name}.png`,
        }}
      />
      <Text style={styles.text} >{pokemon.name}</Text>
      <Entypo name="chevron-small-right" size={50} color="black" style={{right: 10}} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
  card: {
    alignItems: "center",
    marginTop: 15,
    backgroundColor: "#f5b5b5",
    borderRadius: 30,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    elevation: 5,
    
  },

  text:{
    fontSize: 20,
    justifyContent: "center",
  }
});

export default PokemonCard;