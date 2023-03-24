const createGame = () => {
  const dice1 = Math.floor(Math.random() * 6) + 1;
  const dice2 = Math.floor(Math.random() * 6) + 1;
  const wins = dice1 + dice2 === 7 ? true : false;
  return { dice1, dice2, wins };
};

module.exports = createGame;
