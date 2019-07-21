import { mount } from "enzyme";
import * as React from "react";
import * as renderer from "react-test-renderer";
import { FixturesList, Loader } from "../";
import { scheduleByTournamentId as schedule } from "../../__mocks__";

describe("FixturesList", () => {
  it("should render loader", () => {
    const notRenderedComp = mount(
      <FixturesList
        store={{
          data: {
            sport_events: undefined,
          },
          isLoaded: false,
          url: "test",
        }}
      />,
    );
    expect(notRenderedComp.find(Loader)).toHaveLength(1);
  });

  it("should render correctly", () => {
    const comp = (
      <FixturesList
        store={{
          data: {
            sport_events: schedule.sport_events,
          },
          isLoaded: true,
          url: "test",
        }}
      />
    );
    const tree = renderer.create(comp).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
