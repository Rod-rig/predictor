import { company, helpers } from "faker";
import { getTournaments } from "./getTournaments";

const fakeMatches = (): any[] => {
  const arr = [];
  const ids = helpers.shuffle(["test", "id", "name", "id", "", "user", "test"]);
  for (const id of ids) {
    arr.push({
      tournament: {
        id,
        name: company.companyName(),
      },
    });
  }
  return arr;
};

describe("getTournaments", () => {
  let matches: any[];

  beforeEach(() => {
    matches = fakeMatches();
  });

  it("should return correct result", () => {
    const ids = getTournaments(matches);
    expect(Object.keys(ids)).toHaveLength(5);
    expect(Object.keys(ids)).toContain("test");
  });

  it("should have correct length", () => {
    const ids = getTournaments(matches);
    expect(Object.keys(ids)).toHaveLength(5);
  });

  it("should return empty matches with empty input", () => {
    expect(Object.keys(getTournaments([]))).toHaveLength(0);
  });
});
