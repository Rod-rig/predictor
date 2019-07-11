import { filterMatches } from "./filterMatches";

const fakeMatches = (): any[] => {
  const arr = [];
  for (let i = 0; i < 5; i++) {
    arr.push({
      tournament: {
        id: i.toString(),
      },
    });
  }
  return arr;
};

describe("filterMatches", () => {
  let matches: any[];

  beforeEach(() => {
    matches = fakeMatches();
  });

  it("should return correct result", () => {
    expect(filterMatches(matches, "1")).toHaveLength(1);
    expect(filterMatches(matches, "2")).toEqual([
      {
        tournament: {
          id: "2",
        },
      },
    ]);
    expect(filterMatches(matches, "test")).toHaveLength(0);
  });

  it("should return empty matches with empty input", () => {
    expect(filterMatches([], "1")).toHaveLength(0);
  });
});
