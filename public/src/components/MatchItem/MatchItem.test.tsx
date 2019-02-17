import * as React from "react";
import * as renderer from "react-test-renderer";
import { MatchItem } from "./";

describe("MatchItem", () => {
  const futureMatch = <MatchItem awayTeam="Test1" homeTeam="Test2" />;
  const playedMatch = (
    <MatchItem
      awayTeam="Test1"
      awayScore={1}
      awayLogo="logo1"
      homeTeam="Test2"
      homeScore={2}
      homeLogo="logo2"
    />
  );
  it("should render future match correctly", () => {
    const tree = renderer.create(futureMatch).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("should render played match correctly", () => {
    const tree = renderer.create(playedMatch).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
