import { START_PAGE, StatsStore } from "./StatsStore";

describe("StatsStore", () => {
  it("should have correct initial data", () => {
    const mockStore = new StatsStore({
      url: "/",
    });
    expect(mockStore.isLoaded).toBeFalsy();
    expect(mockStore.page).toEqual(START_PAGE);
    expect(mockStore.url).toEqual("/");
  });
});
