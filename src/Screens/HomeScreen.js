import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { StyleSheet } from "react-native";
import PokemonCard from "../Components/PokemonCard";
import pokemonApi from "../services/pokemonApi";

function HomeScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [pokemonNames, setPokemonNames] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPokemons();
  }, [offset]);
  const getPokemons = async () => {
    const response = await pokemonApi.get(
      `/pokemon?offset=${offset * 50}&limit=50`
    );
    const pokemonObjects = response.data.results;
    setPokemonNames(pokemonObjects);
    setTimeout(() => {
      setLoading(false);
    }, 1);
  };

  const nextPage = () => {
    setOffset(offset + 1);
    getPokemons();
  };

  const previousPage = () => {
    setOffset(offset - 1);
    getPokemons();
  };

  return (
    <View style={{
      backgroundColor:loading ? "white" : "#f5f5f5",
    }} >
      {!loading ? (
        <>
          <ScrollView style={{ backgroundColor: "white" }}>
            <View style={styles.container}>
              <TextInput
                style={styles.input}
                placeholder="Search Pokemons..."
                onChangeText={(text) => setSearch(text)}
                value={search}
              ></TextInput>

              {pokemonNames.map((poke, index) => {
                {
                  if (poke.name.includes(search.toLowerCase())) {
                    return (
                      <PokemonCard
                        navigation={navigation}
                        pokemon={poke}
                        id={poke.name}
                      />
                    );
                  } else if (search == "") {
                    return (
                      <PokemonCard
                        navigation={navigation}
                        pokemon={poke}
                        id={poke.name}
                      />
                    );
                  } else {
                    return null;
                  }
                }
              })}
            </View>
          </ScrollView>
          <View style={styles.buttons}>
            {offset > 0 && (
              <Pressable
                onPress={previousPage}
                style={styles.previousPageButton}
              >
                <Text style={styles.nextPageButtonText}>Previous</Text>
              </Pressable>
            )}
            <Text style={styles.page}>
              {offset * 50 + 1}-{(offset + 1) * 50}
            </Text>

            {offset < 25 && (
              <Pressable onPress={nextPage} style={styles.nextPageButton}>
                <Text style={styles.nextPageButtonText}>Next</Text>
              </Pressable>
            )}
          </View>
        </>
      ) : (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="black" />
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    backgroundColor: "#efefef",
    padding: 10,
    width: "80%",
    borderRadius: 60,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    elevation: 5,
    marginTop: 25,
    marginBottom: 10,
    color: "black",
  },

  buttons: {
    bottom: 50,
    position: "absolute",
    justifyContent: "space-around",
    flexDirection: "row",
    backgroundColor: "#111717",
    width: "100%",
    padding: 10,
    borderRadius: 100,
    alignItems: "center",
    alignContent: "center",
  },

  loading: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"rgba(255,255,255,0.5)"
  },

  nextPageButton: {
    backgroundColor: "lightgrey",
    borderRadius: 100,
    elevation: 2,
  },

  page: {
    backgroundColor: "lightgrey",
    borderRadius: 100,
    elevation: 2,
    fontSize: 20,
    padding: 10,
    paddingHorizontal: 20,
  },

  previousPageButton: {
    backgroundColor: "lightgrey",
    borderRadius: 100,
    elevation: 2,
  },

  nextPageButtonText: {
    fontSize: 20,
    padding: 10,
    paddingHorizontal: 20,
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginBottom: 50,
  },
});

export default HomeScreen;
