import { Typography } from "@material-ui/core";
import { mount } from "enzyme";
import * as React from "react";
import { Loader, Prediction } from "../";
import { ISportEvent } from "../../@types";
import { scheduleMock } from "../../__mocks__";
import { userStore } from "../../stores";
import { PredictionMessage } from "./PredictionMessage";

describe("Prediction", () => {
  const createPrediction = (
    isLoaded: boolean,
    data: ISportEvent[],
    isSuccessSubmit: boolean,
    isFetched: boolean,
  ) => {
    const closeSuccessMsgMock = jest.fn();
    const fetchMatchesMock = jest.fn();
    const handleChangeMock = jest.fn();
    const handleSubmitMock = jest.fn();
    const setCurrentDateMock = jest.fn();
    return (
      <Prediction
        store={{
          closeSuccessMsg: closeSuccessMsgMock,
          currentDate: "",
          dates: [],
          fetchMatches: fetchMatchesMock,
          handleChange: handleChangeMock,
          handleSubmit: handleSubmitMock,
          isFetched,
          isLoaded,
          isSuccessSubmit,
          matches: data,
          setCurrentDate: setCurrentDateMock,
        }}
      />
    );
  };
  const comp = createPrediction(true, scheduleMock, false, true);

  it("should render loader", () => {
    const notRenderedComp = mount(createPrediction(false, [], false, true));
    expect(notRenderedComp.find(Loader)).toHaveLength(1);
  });

  it("should render success message after form submit", () => {
    const wrapper = mount(createPrediction(true, scheduleMock, true, true));
    expect(wrapper.find(PredictionMessage)).toHaveLength(1);
  });

  it("should show message when there are no matches", () => {
    const wrapper = mount(createPrediction(true, [], true, true));
    expect(wrapper.find(Typography)).toHaveLength(1);
  });

  it("should show loader when matches are fetching", () => {
    const wrapper = mount(createPrediction(true, [], true, false));
    expect(wrapper.find(Loader)).toHaveLength(1);
  });

  it("should show message for not logged in user", () => {
    userStore.isLoggedIn = undefined;
    const wrapper = mount(comp);
    expect(wrapper.find(Loader)).toHaveLength(1);
  });
});
