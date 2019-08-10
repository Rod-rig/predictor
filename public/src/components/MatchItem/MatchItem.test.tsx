import * as React from "react";
import { MemoryRouter } from "react-router-dom";
import * as renderer from "react-test-renderer";
import { MatchItem } from "./";

describe("MatchItem", () => {
  const wrapMemoryRouter = (comp: React.ReactNode) => {
    return <MemoryRouter>{comp}</MemoryRouter>;
  };

  const predictedWrongMatch = wrapMemoryRouter(
    <MatchItem
      awayTeam="Test1"
      awayScore={1}
      awayLogo="logo1"
      homeTeam="Test2"
      homeScore={2}
      homeLogo="logo2"
      id="test"
      status={0}
    />,
  );
  const futureMatch = wrapMemoryRouter(
    <MatchItem awayTeam="Test1" homeTeam="Test2" id="test" />,
  );
  const playedMatch = wrapMemoryRouter(
    <MatchItem
      awayTeam="Test1"
      awayScore={1}
      awayLogo="logo1"
      homeTeam="Test2"
      homeScore={2}
      homeLogo="logo2"
      id="test"
      status={1}
    />,
  );

  it("should render predicted wrong match correctly", () => {
    const tree = renderer.create(predictedWrongMatch).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render future match correctly", () => {
    const tree = renderer.create(futureMatch).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render played match correctly", () => {
    const tree = renderer.create(playedMatch).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
