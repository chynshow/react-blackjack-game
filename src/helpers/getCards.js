// eslint-disable-next-line import/no-anonymous-default-export
export default (deck, numberOfCards) => {
  let res = [];

  for (let i = 0; i < numberOfCards; i++) {
    res = [...res, deck.shift()];
  }
  return res;
};
