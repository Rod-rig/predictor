import * as React from "react";
import { MemoryRouter } from "react-router-dom";
import * as renderer from "react-test-renderer";
import { IPredictionMatch } from "../../@types";
import { predictions } from "../../__mocks__";
import { Stats } from "./";

describe("Stats", () => {
  type StatsType = (data: IPredictionMatch[], isLoaded: boolean) => JSX.Element;
  let stats: StatsType;

  beforeEach(() => {
    stats = (data, isLoaded) => (
      <Stats
        store={{
          data,
          isLoaded,
          url: "url",
        }}
      />
    );
  });

  it("should render stats with predictions correctly", () => {
    const comp = stats(predictions, true);
    const tree = renderer.create(comp).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render stats with not loaded predictions correctly", () => {
    const comp = stats([], false);
    const tree = renderer.create(comp).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render empty stats comp correctly", () => {
    const comp = stats([], true);
    const tree = renderer.create(<MemoryRouter>{comp}</MemoryRouter>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
