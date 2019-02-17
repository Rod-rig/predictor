import { getFutureDates } from "./getFutureDates";

describe("getFutureDates", () => {
  it("should return correct result", () => {
    expect(getFutureDates(new Date(2007, 11, 28))).toEqual([
      "2007-12-28",
      "2007-12-29",
      "2007-12-30",
      "2007-12-31",
      "2008-01-01",
      "2008-01-02",
      "2008-01-03",
    ]);
    expect(getFutureDates(new Date(2018, 1, 1))).toEqual([
      "2018-02-01",
      "2018-02-02",
      "2018-02-03",
      "2018-02-04",
      "2018-02-05",
      "2018-02-06",
      "2018-02-07",
    ]);
    expect(getFutureDates(new Date(2016, 1, 27))).toEqual([
      "2016-02-27",
      "2016-02-28",
      "2016-02-29",
      "2016-03-01",
      "2016-03-02",
      "2016-03-03",
      "2016-03-04",
    ]);
    expect(getFutureDates(new Date(2016, 5, 25))).toEqual([
      "2016-06-25",
      "2016-06-26",
      "2016-06-27",
      "2016-06-28",
      "2016-06-29",
      "2016-06-30",
      "2016-07-01",
    ]);
  });
});
