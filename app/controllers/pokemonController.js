const findPokemon = async (req, res) => {
  const { id } = req.params;
  if (!id || id.toString()[0] === '0') {
    return res
      .status(400)
      .json({ message: 'Id provided is not valid, please provide a number id between 1 and 1000' });
  }
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  if (!response) return res.status(500).json({ message: 'Something went wrong, please try again' });

  if (!response.ok)
    return res.status(400).json({ message: 'Invalid pokemon name or id, please try another one' });
  const data = await response.json();
  const pokemon = {
    name: data.forms[0].name,
    height: data.height,
    weight: data.weight,
  };
  return res.json(pokemon);
  // En aquest punt l'Oriol em comenta que per norma sempre afegeixi return devant d'un res.
  // Jo crec que no és pas necessari perquè com que només puc tenir una resposta per request,
  // A la que arribi a un res.json() o res.status() ja no seguirà executant codi.
  // En resum, que afegir return no tindria cap efecte però no sé si és per bones pràctiques que s'ha d'afegir.
};

module.exports = { findPokemon };
