import { PredictionStore } from "./";

describe("PredictionStore", () => {
  const mockStore = new PredictionStore();
  const mockWithFilter = new PredictionStore({
    filter: "tournament_id=sr:tournament:37",
  });

  it("should be initialized correctly", () => {
    expect(mockStore).toBeInstanceOf(PredictionStore);
    expect(mockWithFilter).toBeInstanceOf(PredictionStore);
  });

  it("should create correct object", () => {
    expect(mockStore.matches[0]).toMatchSnapshot();
  });

  it("mock with filters should have less matches", () => {
    expect(mockStore.matches.length).toBeGreaterThan(
      mockWithFilter.matches.length,
    );
  });

  it("should repeat fetching matches", () => {
    const fetchSpy = jest.fn(mockStore.fetchMatches.bind(mockStore));
    fetchSpy();
    expect(fetchSpy.mock.calls).toHaveLength(1);
    expect(fetchSpy.mock.results[0].value).toBeFalsy();
  });

  it("should set current date", () => {
    const setDate = jest.fn(mockStore.setCurrentDate.bind(mockStore));
    setDate("1234-56-78");
    expect(setDate.mock.calls).toHaveLength(1);
    expect(setDate.mock.calls[0][0]).toBe("1234-56-78");
    expect(mockStore.currentDate).toBe("1234-56-78");
  });

  it("should change field", () => {
    const changeSpy = jest.fn(mockStore.handleChange.bind(mockStore));
    changeSpy(0, 0, { target: { value: "0" } });
    changeSpy(0, 1, { target: { value: "1" } });
    expect(changeSpy.mock.calls).toHaveLength(2);
    expect(changeSpy.mock.calls[0][0]).toBe(0);
    expect(mockStore.matches[0].competitors[0].userPrediction).toBe(0);
    expect(mockStore.matches[0].competitors[1].userPrediction).toBe(1);
  });

  it("should submit form", () => {
    mockStore.handleChange(0, 0, { target: { value: "0" } });
    mockStore.handleChange(0, 1, { target: { value: "1" } });
    const submitSpy = jest.fn(
      mockStore.handleSubmit.bind(mockStore, new Event("submit")),
    );
    submitSpy();
    expect(submitSpy.mock.calls).toHaveLength(1);
  });

  it("should close succes msg modal", () => {
    mockStore.closeSuccessMsg();
    expect(mockStore.isSuccessSubmit).toBeFalsy();
  });
});
