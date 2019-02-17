import * as React from "react";
import * as renderer from "react-test-renderer";
import { predictions } from "../../__mocks__";
import { Stats } from "./";

describe("Stats", () => {
  const stats = (
    <Stats
      store={{
        data: predictions,
        isLoaded: true,
        url: "url",
      }}
    />
  );

  const emptyStats = (
    <Stats
      store={{
        data: [],
        isLoaded: false,
        url: "url",
      }}
    />
  );

  it("should render stats correctly", () => {
    const tree = renderer.create(stats).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render empty stats comp correctly", () => {
    const tree = renderer.create(emptyStats).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
