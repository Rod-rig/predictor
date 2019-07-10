import { MenuItem } from "@material-ui/core";
import { mount } from "enzyme";
import * as React from "react";
import * as renderer from "react-test-renderer";
import { PredictionFilter } from "./PredictionFilter";

describe("PredictionFilter", () => {
  const setCurrentDateMock = jest.fn();
  const fetchMock = jest.fn();
  const setTournamentIdMock = jest.fn();
  const setMatchesMock = jest.fn();
  const predictionFilter = (
    <PredictionFilter
      store={{
        cache: {},
        closeSuccessMsg: jest.fn(),
        currentDate: "date",
        dates: ["Berlin", "Rome", "Paris", "London"],
        fetchMatches: fetchMock,
        handleChange: jest.fn(),
        handleDateChange: jest.fn(),
        handleSubmit: jest.fn(),
        handleTournamentChange: jest.fn(),
        isFetched: true,
        isLoaded: true,
        isSuccessSubmit: false,
        matches: [],
        setCurrentDate: setCurrentDateMock,
        setMatches: setMatchesMock,
        setTournamentId: setTournamentIdMock,
        tournamentId: "",
        tournaments: {},
      }}
    />
  );
  const filterWrapper = mount(predictionFilter);

  it("should trigger change event", () => {
    const select = filterWrapper.find('[role="button"]');
    select.simulate("click");
    expect(select).toHaveLength(1);
    filterWrapper
      .find(MenuItem)
      .at(2)
      .simulate("click");
    expect(setCurrentDateMock.mock.calls).toHaveLength(1);
  });

  it("should trigger submit event", () => {
    const button = filterWrapper.find("Button");
    button.simulate("click");
    expect(fetchMock.mock.calls).toHaveLength(1);
  });

  it("should render correctly", () => {
    const tree = renderer.create(predictionFilter).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
