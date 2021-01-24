import getCardsSum from './getCardsSum';
describe('test getCardSum function', () => {
  const numberCards = [
    {
      code: '2D',
      suit: 'DIAMONDS',
      value: '2',
    },
    {
      code: '9H',
      suit: 'HEARTS',
      value: '9',
    },
  ];
  const pictureCards = [
    {
      code: 'JD',
      suit: 'DIAMONDS',
      value: 'JACK',
    },
    {
      code: 'QH',
      suit: 'HEARTS',
      value: 'QUEEN',
    },
    {
      code: 'KH',
      suit: 'HEARTS',
      value: 'KING',
    },
  ];
  const ace = [
    {
      code: 'AS',
      value: 'ACE',
    },
    {
      code: 'AH',
      value: 'ACE',
    },
    {
      code: 'AC',
      value: 'ACE',
    },
  ];
  it('test if cards are only number values', () => {
    const res = getCardsSum(numberCards);
    expect(res).toBe(11);
  });

  it('test if cards are only picture values', () => {
    const res = getCardsSum(pictureCards);
    expect(res).toBe(30);
  });
  it('test if cards are picture and number values', () => {
    const res = getCardsSum([...numberCards, ...pictureCards]);
    expect(res).toBe(41);
  });
  it('test if cards are only ace values', () => {
    const res = getCardsSum(ace);
    expect(res).toBe(13);
  });
  it('test if cards are ace and number values', () => {
    const res = getCardsSum([...numberCards, ...ace]);
    expect(res).toBe(14);
  });
  it('test if cards are picture and ace values', () => {
    const res = getCardsSum([...pictureCards, ...ace]);
    expect(res).toBe(33);
  });
  it('test if cards are mix values', () => {
    const res = getCardsSum([...numberCards, ...ace, ...pictureCards]);
    expect(res).toBe(44);
  });
});
