import { TournamentListStore } from "./";

describe("TournamentListStore", () => {
  const mockStore = new TournamentListStore();

  it("should be initialized correctly", () => {
    expect(mockStore).toBeInstanceOf(TournamentListStore);
  });

  it("should have correct props", () => {
    const { name, id } = mockStore.list[0];
    expect(mockStore.isLoaded).toBeTruthy();
    expect(name).toBe("UEFA Champions League");
    expect(id).toBe("sr:tournament:7");
  });
});
