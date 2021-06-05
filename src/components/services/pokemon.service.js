async function getPokemon(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (err) {
    console.log("fetch failed", err.message);
  }
}

export default getPokemon;
