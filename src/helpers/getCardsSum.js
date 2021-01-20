// eslint-disable-next-line import/no-anonymous-default-export
export default (cards) =>
  // eslint-disable-next-line array-callback-return
  cards.reduce((acc, card) => {
    if (card.value) {
      if (
        card.value === 'KING' ||
        card.value === 'QUEEN' ||
        card.value === 'JACK'
      )
        return (acc += 10);

      if (!isNaN(card.value)) return (acc += +card.value);

      // if (card.value.startsWith('A') && acc + 11 > 21) return (acc += 1);

      if (card.value.startsWith('A')) {
        console.log(acc + 11 < 21);
        if (acc + 11 < 21) {
          return (acc += 11);
        } else {
          return (acc += 1);
        }
      }
    }
  }, 0);
