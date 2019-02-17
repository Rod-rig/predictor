import { mount } from "enzyme";
import * as React from "react";
import { MemoryRouter } from "react-router-dom";
import { Loader } from "..";
import { tournamentListMock } from "../../__mocks__";
import { TournamentList } from "./";

describe("TournamentList", () => {
  const comp = (isLoaded: boolean) => {
    return mount(
      <MemoryRouter>
        <TournamentList
          classes={{ list: "list" }}
          store={{ isLoaded, list: tournamentListMock.tournaments }}
        />
      </MemoryRouter>,
    );
  };
  it("should have correct root props", () => {
    const root = comp(true);
    const tournProp = root.find(".list").first();
    expect(tournProp.prop("container")).toBeTruthy();
    expect(tournProp.prop("spacing")).toBe(16);
    expect(root.find(Loader)).toHaveLength(0);
  });

  it("should have loader", () => {
    const root = comp(false);
    expect(root.find(".list")).toHaveLength(0);
    expect(root.find(Loader)).toHaveLength(1);
  });
});
