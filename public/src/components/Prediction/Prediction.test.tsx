import { CircularProgress, Typography } from "@material-ui/core";
import { mount } from "enzyme";
import * as React from "react";
import { Loader, Prediction } from "../";
import { ISportEvent } from "../../@types";
import { scheduleByDateMock as schedule } from "../../__mocks__";
import { userStore } from "../../stores";
import { PredictionMessage } from "./PredictionMessage";

describe("Prediction", () => {
  const createPrediction = (
    isLoaded: boolean,
    data: ISportEvent[],
    isSuccessSubmit: boolean,
    isFetched: boolean,
    buttonWasClicked: boolean,
  ) => {
    return (
      <Prediction
        store={{
          buttonWasClicked,
          cache: {},
          closeSuccessMsg: jest.fn(),
          currentDate: "",
          dates: [],
          fetchMatches: jest.fn(),
          fetchMatchesError: jest.fn(),
          fetchMatchesSuccess: jest.fn(),
          handleChange: jest.fn(),
          handleDateChange: jest.fn(),
          handleSubmit: jest.fn(),
          handleSubmitError: jest.fn(),
          handleSubmitSuccess: jest.fn(),
          handleTournamentChange: jest.fn(),
          isFetched,
          isLoaded,
          isSuccessSubmit,
          matches: data,
          setCurrentDate: jest.fn(),
          setMatches: jest.fn(),
          setTournamentId: jest.fn(),
          tournamentId: "",
          tournaments: {},
        }}
      />
    );
  };
  const { sport_events: events } = schedule;
  const comp = createPrediction(true, events, false, true, false);

  it("should render loader", () => {
    const notRenderedComp = mount(
      createPrediction(false, [], false, true, false),
    );
    expect(notRenderedComp.find(Loader)).toHaveLength(1);
  });

  it("should render submit button with loader", () => {
    const wrapper = mount(createPrediction(true, events, false, true, true));
    expect(wrapper.find(CircularProgress)).toHaveLength(1);
  });

  it("should render success message after form submit", () => {
    const wrapper = mount(createPrediction(true, events, true, true, false));
    expect(wrapper.find(PredictionMessage)).toHaveLength(1);
  });

  it("should show message when there are no matches", () => {
    const wrapper = mount(createPrediction(true, [], true, true, false));
    expect(wrapper.find(Typography)).toHaveLength(1);
  });

  it("should show loader when matches are fetching", () => {
    const wrapper = mount(createPrediction(true, [], true, false, false));
    expect(wrapper.find(Loader)).toHaveLength(1);
  });

  it("should show message for not logged in user", () => {
    userStore.isLoggedIn = undefined;
    const wrapper = mount(comp);
    expect(wrapper.find(Loader)).toHaveLength(1);
  });
});
