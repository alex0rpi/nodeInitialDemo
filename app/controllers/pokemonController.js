const findPokemon = async (req, res) => {
  const { id } = req.params;
  if (!id || id > 1000 || id <= 0 || id.toString()[0] === '0') {
    res
      .status(404)
      .json({ message: 'Id provided is not valid, please provide a number id between 1 and 1000' });
  }
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  if (!response.ok) res.status(500).json({ message: 'Something went wrong, please try again' });
  const data = await response.json();
  const pokemon = {
    name: data.forms[0].name,
    height: data.height,
    weight: data.weight,
  };
  res.json(pokemon);
};

module.exports = { findPokemon };
