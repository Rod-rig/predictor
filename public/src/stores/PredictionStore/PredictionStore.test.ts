import { date, random } from "faker";
import { userStore } from "../";
import { IPredictionStore } from "../../@types/IMatch";
import { constants } from "../../constants";
import { getFutureDates } from "../../helpers";
import { PredictionStore } from "./";

describe("PredictionStore", () => {
  const initialTournamentId = "sr:tournament:37";
  const initialDate = "01-01-2000";
  const mockStore = new PredictionStore();
  const mockWithFilter = new PredictionStore({
    filter: `tournament_id=${initialTournamentId}&date=${initialDate}`,
  });

  it("should be initialized correctly", () => {
    expect(mockStore).toBeInstanceOf(PredictionStore);
    expect(mockWithFilter).toBeInstanceOf(PredictionStore);
  });

  it("should have correct initial state", () => {
    expect(mockStore.isLoaded).toBeTruthy();
    expect(mockStore.isFetched).toBeTruthy();

    expect(mockStore.currentDate).toBe(getFutureDates()[0]);
    expect(mockWithFilter.currentDate).toBe(initialDate);

    expect(mockStore.tournamentId).toBe(constants.defaultTournamentsValue);
    expect(mockWithFilter.tournamentId).toBe(initialTournamentId);
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

  it("should close success msg modal", () => {
    mockStore.closeSuccessMsg();
    expect(mockStore.isSuccessSubmit).toBeFalsy();
  });

  describe("handleSubmit", () => {
    let store: IPredictionStore;

    beforeEach(() => {
      store = new PredictionStore();
    });

    afterEach(() => {
      store = null;
    });

    it("should not submit form", () => {
      store.handleSubmit(new Event("submit"));
      expect(store.buttonWasClicked).toBeFalsy();
      expect(store.isSuccessSubmit).toBeFalsy();
    });

    it("should submit form", () => {
      store.handleChange(0, 0, { target: { value: "0" } });
      store.handleChange(0, 1, { target: { value: "1" } });
      const submitSpy = jest.fn(
        store.handleSubmit.bind(store, new Event("submit")),
      );
      submitSpy();
      expect(submitSpy.mock.calls).toHaveLength(1);
    });

    it("should handle success submit", () => {
      store.handleSubmitSuccess();

      expect(store.isSuccessSubmit).toBeTruthy();
      expect(store.buttonWasClicked).toBeFalsy();
    });

    it("should handle error submit", () => {
      store.handleSubmitError();

      expect(store.isSuccessSubmit).toBeFalsy();
      expect(store.buttonWasClicked).toBeFalsy();
    });
  });

  describe("setCurrentDate", () => {
    let store: IPredictionStore;
    let currentDate: string;

    beforeEach(() => {
      store = new PredictionStore();
      currentDate = date.past().toString();
    });

    afterEach(() => {
      store = null;
      currentDate = null;
    });

    it.each([1, 2, 3, 4, 5])("should set current date", () => {
      store.setCurrentDate(currentDate);
      expect(store.currentDate).toBe(currentDate);
    });
  });

  describe("setTournamentId", () => {
    let store: IPredictionStore;
    let id: string;

    beforeEach(() => {
      store = new PredictionStore();
      id = random.number().toString();
    });

    afterEach(() => {
      store = null;
      id = null;
    });

    it.each([1, 2, 3, 4, 5])("should set tournament id", () => {
      store.setTournamentId(id);
      expect(store.tournamentId).toBe(id);
    });
  });

  describe("handleTournamentChange", () => {
    let store: IPredictionStore;
    let event: any;
    let id: string;

    beforeEach(() => {
      store = new PredictionStore();
      id = random.number().toString();
      event = {
        target: {
          value: id,
        },
      };
      store.handleTournamentChange(event);
    });

    afterEach(() => {
      store = null;
      event = null;
      id = null;
    });

    it("should set tournament id correctly", () => {
      expect(store.tournamentId).toBe(id);
    });

    it("should set empty matches", () => {
      expect(store.matches).toEqual([]);
    });
  });

  describe("handleDateChange", () => {
    let store: IPredictionStore;
    let event: any;
    let mockDate: string;

    beforeEach(() => {
      store = new PredictionStore();
      mockDate = date.past().toString();
      event = {
        target: {
          value: mockDate,
        },
      };
      store.handleDateChange(event);
    });

    afterEach(() => {
      store = null;
      event = null;
      mockDate = null;
    });

    it("should set current date correctly", () => {
      expect(store.currentDate).toBe(mockDate);
    });

    it("should set default tournament id", () => {
      expect(store.tournamentId).toBe(constants.defaultTournamentsValue);
    });
  });

  describe("cache", () => {
    let store: IPredictionStore;

    beforeEach(() => {
      store = new PredictionStore({
        filter: "tournament_id=all",
      });
      store.setMatches = jest.fn(store.setMatches.bind(store));
      store.setTournamentId = jest.fn(store.setTournamentId.bind(store));
    });

    afterEach(() => {
      store = null;
    });

    it("should contain matches and cache", () => {
      const cache = store.cache[store.currentDate];
      expect(store.matches.length).toBe(cache.length);
      expect(store.tournamentId).toBe(constants.defaultTournamentsValue);
    });

    it("shouldn't fetch matches if cache is present", () => {
      const { currentDate } = store;

      store.handleDateChange({
        target: {
          value: currentDate,
        },
      });

      expect(store.setMatches).toHaveBeenCalled();
    });

    it("should handle tournament change from cache", () => {
      store.handleTournamentChange({
        target: {
          value: constants.defaultTournamentsValue,
        },
      });

      expect(store.setTournamentId).toHaveBeenCalledWith(
        constants.defaultTournamentsValue,
      );
      expect(store.setMatches).toHaveBeenCalled();
    });
  });

  describe("fetchMatchesError", () => {
    let store: IPredictionStore;

    beforeEach(() => {
      store = new PredictionStore();
      userStore.logout = jest.fn(userStore.logout.bind(userStore));
    });

    afterEach(() => {
      store = null;
    });

    it("should handle 403 error", () => {
      store.fetchMatchesError({
        status: 403,
      });

      expect(userStore.logout).toHaveBeenCalled();
    });

    it("should handle 404 error", () => {
      store.fetchMatchesError({
        status: 404,
      });

      expect(store.isLoaded).toBeTruthy();
      expect(store.isFetched).toBeTruthy();
    });
  });
});
