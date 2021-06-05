import { useState, useEffect } from "react";
import PokemonHeader from "../header/PokemonHeader";
import PokemonContent from "../content/PokemonContent";
import getPokemonService from "../services/pokemon.service";

import "../../styles/pokeStyles.scss";

const PokemonContext = () => {
  // Este setState sirve para almacenar la información de la API consumida. //
  const [pokemonData, setPokemonData] = useState([]);
  // Este setState sirve para la siguiente paginación. //
  const [nextUrl, setNextUrl] = useState("");
  // Este setState sirve para la anterior paginación. //
  const [prevUrl, setPrevUrl] = useState("");

  // Este setState sirve para avisar que se esta cargando la información. //
  const [loading, setLoading] = useState(false);
  const AllPokemons = "https://pokeapi.co/api/v2/pokemon/";

  async function searchPokemon(url) {
    try {
      setLoading(true);
      const response = await getPokemonService(url);
      const { next, previous, results } = response;

      setNextUrl(next);
      setPrevUrl(previous);
      await loadingPokemon(results);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("fetch failed", err.message);
    }
  }

  // Con este useEffect podemos conectar con la PokeAPI. //
  useEffect(() => {
    searchPokemon(AllPokemons);
  }, []);

  function handleSearchPrev() {
    if (prevUrl) {
      searchPokemon(prevUrl);
    }
  }

  function handleSearchNext() {
    if (nextUrl) {
      searchPokemon(nextUrl);
    }
  }

  // Con esta función podemos traer la información completa de cada pókemon. //
  const loadingPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getPokemonService(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  return (
    <div>
      <PokemonHeader />
      <PokemonContent
        nextUrl={nextUrl}
        prevUrl={prevUrl}
        pokemons={pokemonData}
        loading={loading}
        onSearchPrev={handleSearchPrev}
        onSearchNext={handleSearchNext}
      />
    </div>
  );
};

export default PokemonContext;
