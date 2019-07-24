import { mount } from "enzyme";
import * as React from "react";
import * as renderer from "react-test-renderer";
import { FixturesList, Loader } from "../";
import { IFixture } from "../../@types";
import { scheduleByTournamentId as schedule } from "../../__mocks__";

describe("FixturesList", () => {
  const renderComp = (sportEvents: IFixture[], isLoaded: boolean) => (
    <FixturesList
      store={{
        data: {
          sport_events: sportEvents,
        },
        isLoaded,
        url: "test",
      }}
    />
  );

  it("should render loader", () => {
    const notRenderedComp = mount(renderComp(undefined, false));
    expect(notRenderedComp.find(Loader)).toHaveLength(1);
  });

  it("should render match list correctly", () => {
    const comp = renderComp(schedule.sport_events, true);
    const tree = renderer.create(comp).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render empty match list message correctly", () => {
    const comp = renderComp([], true);
    const tree = renderer.create(comp).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
