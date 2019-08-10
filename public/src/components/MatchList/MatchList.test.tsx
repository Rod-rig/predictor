import { mount } from "enzyme";
import * as React from "react";
import * as renderer from "react-test-renderer";
import { Loader, MatchList } from "../";
import { IMatch } from "../../@types";
import { matchListMock } from "../../__mocks__";
import { MemoryRouter } from "react-router-dom";

describe("MatchList", () => {
  const renderComp = (results: IMatch[], isLoaded: boolean) => (
    <MemoryRouter>
      <MatchList
        store={{
          data: {
            results,
          },
          isLoaded,
          url: "test",
        }}
      />
    </MemoryRouter>
  );

  it("should render loader", () => {
    const notRenderedComp = mount(renderComp(undefined, false));
    expect(notRenderedComp.find(Loader)).toHaveLength(1);
  });

  it("should render match list correctly", () => {
    const comp = renderComp(matchListMock.results, true);
    const tree = renderer.create(comp).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render empty match list message correctly", () => {
    const comp = renderComp([], true);
    const tree = renderer.create(comp).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
