import getCards from './getCards';
describe('test getCards function', () => {
  const deck = [
    {
      code: '2D',
      image: 'https://deckofcardsapi.com/static/img/2D.png',
      images: {
        png: 'https://deckofcardsapi.com/static/img/2D.png',
        svg: 'https://deckofcardsapi.com/static/img/2D.svg',
      },
      suit: 'DIAMONDS',
      value: '2',
    },
    {
      code: '9H',
      image: 'https://deckofcardsapi.com/static/img/9H.png',
      images: {
        png: 'https://deckofcardsapi.com/static/img/9H.svg',
        svg: 'https://deckofcardsapi.com/static/img/9H.svg',
      },
      suit: 'HEARTS',
      value: '9',
    },
    {
      code: '2D',
      image: 'https://deckofcardsapi.com/static/img/2D.png',
      images: {
        png: 'https://deckofcardsapi.com/static/img/2D.png',
        svg: 'https://deckofcardsapi.com/static/img/2D.svg',
      },
      suit: 'DIAMONDS',
      value: '2',
    },
    {
      code: '9H',
      image: 'https://deckofcardsapi.com/static/img/9H.png',
      images: {
        png: 'https://deckofcardsapi.com/static/img/9H.svg',
        svg: 'https://deckofcardsapi.com/static/img/9H.svg',
      },
      suit: 'HEARTS',
      value: '9',
    },
  ];
  it('deck is empty, number of cards 2', () => {
    const res = getCards([], 2);
    expect(res).toEqual([]);
  });
  it('deck is not empty, number of cards 2', () => {
    const res = getCards(deck, 2);
    const output = [
      {
        code: '2D',
        image: 'https://deckofcardsapi.com/static/img/2D.png',
        images: {
          png: 'https://deckofcardsapi.com/static/img/2D.png',
          svg: 'https://deckofcardsapi.com/static/img/2D.svg',
        },
        suit: 'DIAMONDS',
        value: '2',
      },
      {
        code: '9H',
        image: 'https://deckofcardsapi.com/static/img/9H.png',
        images: {
          png: 'https://deckofcardsapi.com/static/img/9H.svg',
          svg: 'https://deckofcardsapi.com/static/img/9H.svg',
        },
        suit: 'HEARTS',
        value: '9',
      },
    ];
    expect(res).toEqual(output);
  });
  it('deck is not empty, number of cards 0', () => {
    const res = getCards(deck, 0);
    const output = [];
    expect(res).toEqual(output);
  });
});
