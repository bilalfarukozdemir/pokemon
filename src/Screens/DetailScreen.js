import React, { useState, useEffect } from "react";
import { View, Text, Pressable, Image } from "react-native";
import { StyleSheet } from "react-native";
import pokemonApi from "../services/pokemonApi";

function DetailScreen({ navigation, route }) {
  const { id } = route.params;
  const [responseList, setResponse] = useState([]);
  const [types, setTypes] = useState([]);
  const [pokeAbilities, setAbilities] = useState([]);
  const [name, setName] = useState([]);
  const [pokemonId, setPokemonId] = useState(id);
  useEffect(() => {
    getPokemons();
  }, [pokemonId]);
  const getPokemons = async () => {
    const response = await pokemonApi.get(`/pokemon/${pokemonId}`);
    const responseObject = response.data;
    setResponse(responseObject);
    const pokemonTypes = responseObject.types;
    let types = "";
    const pokemonAbilities = responseObject.abilities;
    let pokeAbilities = "";

    pokemonTypes.map((type, index) => {
      types = types + type.type.name + ", ";
    });

    pokemonAbilities.map((ability, index) => {
      pokeAbilities = pokeAbilities + ability.ability.name + ", ";
    });
    setAbilities(pokeAbilities);
    setTypes(types);
    setName(responseObject.forms[0].name);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${name}.png`,
          }}
        ></Image>
        <Text style={styles.text}>{name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Type: {types}</Text>
        <Text style={styles.infoText}>Height: {responseList.height}</Text>
        <Text style={styles.infoText}>Weight: {responseList.weight}</Text>
        <Text style={styles.infoText}>Abilities: {pokeAbilities}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => setPokemonId(parseInt(pokemonId) - 1)}
        >
          <Text style={{ alignItems: "center", marginBottom: 5, marginTop: 5 }}>
            Go Back
          </Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => setPokemonId(parseInt(pokemonId) + 1)}
        >
          <Text style={{ alignItems: "center", marginBottom: 5, marginTop: 5 }}>
            Next
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },

  text: {
    fontSize: 25,
    marginTop: 2,
    position: "absolute",
    bottom: 5,
    left: 10,
  },

  container: {
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: 25,
  },

  imageContainer: {
    width: "100%",
    height: 250,
    alignItems: "center",
    marginTop: 25,
    marginHorizontal: 25,
    backgroundColor: "#D1ECEB",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 10,
  },

  infoContainer: {
    width: "100%",
    backgroundColor: "#D1ECEB",
    marginTop: 25,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 10,
  },

  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "white",
    borderRadius: 100,
    width: "90%",
    marginBottom: 20,
    position: "absolute",
    bottom: 0,
  },

  button: {
    backgroundColor: "#D1ECEB",
    padding: 10,
    width: "45%",
    borderRadius: 100,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    elevation: 5,
    marginTop: 20,
    marginBottom: 20,
    color: "black",
    margin: 40,
    alignItems: "center",
  },
});

export default DetailScreen;
