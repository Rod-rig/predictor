/* tslint:disable: object-literal-sort-keys*/
export const ratingMock = [
  {
    name: "user1",
    stats: {
      totalPredictions: 108,
      correctPredictions: 10,
      pendingPredictions: 10,
      successRate: 10.2,
      oneXTwoSuccessRate: 50,
    },
    hasEnoughPredictions: true,
  },
  {
    name: "user2",
    stats: {
      totalPredictions: 77,
      correctPredictions: 3,
      pendingPredictions: 7,
      successRate: 4.29,
      oneXTwoSuccessRate: 50,
    },
    hasEnoughPredictions: true,
  },
  {
    name: "test",
    stats: {
      totalPredictions: 8,
      correctPredictions: 0,
      pendingPredictions: 0,
      successRate: 0,
      oneXTwoSuccessRate: 12.5,
    },
    hasEnoughPredictions: false,
  },
  {
    name: "John",
    stats: {
      totalPredictions: 3,
      correctPredictions: 0,
      pendingPredictions: 0,
      successRate: 0,
      oneXTwoSuccessRate: 66.67,
    },
    hasEnoughPredictions: false,
  },
];
