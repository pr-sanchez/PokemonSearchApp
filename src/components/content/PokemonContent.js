import { useState, useMemo } from "react";
import CardContainer from "../content/CardContainer";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PokemonContent({
  pokemons,
  loading,
  onSearchNext,
  onSearchPrev,
  nextUrl,
  prevUrl,
}) {
  // //////////////////////////////////
  // //////////////////////////////////
  // ////// PRIVATE METHODS ///////////
  // //////////////////////////////////
  // //////////////////////////////////

  // Este setState sirve para cambiar el orden de la lista. //
  const [pokemonView, setPokemonView] = useState("");
  // Este setState sirve para filtrar en la lista. //
  const [searchPokemon, setSearchPokemon] = useState("");

  const memoizedFilteredPokemons = useMemo(
    () => filterPokemons(pokemons, searchPokemon),
    [pokemons, searchPokemon]
  );

  function filterPokemons(pokemons, searchPokemon) {
    const filteredPokemons = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchPokemon)
    );

    return filteredPokemons;
  }

  function mapPokemons(pokemons) {
    const mappedPokemons = pokemons.map((pokemon, i) => (
      <CardContainer key={pokemon.id} pokemon={pokemon} />
    ));

    return mappedPokemons;
  }

  //  //////////////////////////////////
  //  //////////////////////////////////
  //  //////// EVENT HANDLERS //////////
  //  //////////////////////////////////
  //  //////////////////////////////////

  function handleChangePokemonView(event) {
    setPokemonView(event.target.value);
  }

  function handleSearchPokemon(event) {
    setSearchPokemon(event.target.value);
  }

  //  //////////////////////////////////
  //  //////////////////////////////////
  //  ////////// RENDERERS /////////////
  //  //////////////////////////////////
  //  //////////////////////////////////

  function renderLoader() {
    if (!loading) {
      return null;
    }
    return <h1>Loading...</h1>;
  }

  function renderDisplayAndSearch() {
    if (loading) {
      return null;
    }

    let displayAndSearchClassName = "content-search";

    if (pokemonView === "lista") {
      displayAndSearchClassName = "content-search widthList";
    }

    return (
      <div className={displayAndSearchClassName}>
        <div className="content-search__wrapper-select">
          Ver como:
          <select
            className="content-search__select"
            value={pokemonView}
            onChange={handleChangePokemonView}
          >
            <option className="content-search__select-option" value="grilla">
              Grilla
            </option>
            <option className="content-search__select-option" value="lista">
              Lista
            </option>
          </select>
        </div>
        <div className="content-search__wrapper-input">
          <FontAwesomeIcon className="content-search__img" icon={faSearch} />
          <input
            className="content-search__input"
            type="text"
            value={searchPokemon}
            onChange={handleSearchPokemon}
          />
        </div>
      </div>
    );
  }

  function renderControls() {
    if (loading) {
      return null;
    }

    let prevButtonProps = {};
    if (prevUrl == null) {
      prevButtonProps["disabled"] = true;
    }

    let nextButtonProps = {};
    if (nextUrl == null) {
      nextButtonProps["disabled"] = true;
    }

    return (
      <div className="content-btn">
        <button
          {...prevButtonProps}
          type="button"
          className="content-btn__btn"
          onClick={onSearchPrev}
        >
          Prev
        </button>
        <button
          {...nextButtonProps}
          type="button"
          className="content-btn__btn"
          onClick={onSearchNext}
        >
          Next
        </button>
      </div>
    );
  }

  function renderPokemons() {
    const noPokemonsFoundMessage = <h1>No existen datos que mostrar</h1>;

    if (pokemons.length > 0 == false) {
      return noPokemonsFoundMessage;
    }

    const filteredPokemons = memoizedFilteredPokemons;

    if (filteredPokemons.length > 0 == false) {
      return noPokemonsFoundMessage;
    }

    const mappedPokemons = mapPokemons(filteredPokemons);

    let pokemonsClassName = "content-information";

    if (pokemonView === "lista") {
      pokemonsClassName = "content-information listaStyle";
    }

    return <div className={pokemonsClassName}>{mappedPokemons}</div>;
  }

  return (
    <div className="content-wrapper">
      <div className="content-container">
        <div className="content-title">Encuentra a tu Pokemon!</div>
        {renderLoader()}
        {renderControls()}
        {renderDisplayAndSearch()}
        {renderPokemons()}
        {renderControls()}
      </div>
    </div>
  );
}

export default PokemonContent;
