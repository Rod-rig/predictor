import * as React from "react";
import * as renderer from "react-test-renderer";
import { PredictionFilter } from "./PredictionFilter";

describe("PredictionFilter", () => {
  const predictionFilter = (
    <PredictionFilter
      store={{
        cache: {},
        closeSuccessMsg: jest.fn(),
        currentDate: "date",
        dates: ["Berlin", "Rome", "Paris", "London"],
        fetchMatches: jest.fn(),
        fetchMatchesError: jest.fn(),
        fetchMatchesSuccess: jest.fn(),
        handleChange: jest.fn(),
        handleDateChange: jest.fn(),
        handleSubmit: jest.fn(),
        handleSubmitError: jest.fn(),
        handleSubmitSuccess: jest.fn(),
        handleTournamentChange: jest.fn(),
        isFetched: true,
        isLoaded: true,
        isSuccessSubmit: false,
        matches: [],
        setCurrentDate: jest.fn(),
        setMatches: jest.fn(),
        setTournamentId: jest.fn(),
        tournamentId: "",
        tournaments: {
          "0": "EPL",
          "100": "Bundesliga",
        },
      }}
    />
  );

  it("should render correctly", () => {
    const tree = renderer.create(predictionFilter).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
