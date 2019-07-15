import { Drawer, List } from "@material-ui/core";
import { mount } from "enzyme";
import * as React from "react";
import { MemoryRouter } from "react-router-dom";
import { Sidebar } from ".";

describe("Sidebar", () => {
  let sidebar: any;

  beforeEach(() => {
    sidebar = mount(
      <MemoryRouter>
        <Sidebar isOpen={true} toggleHandler={jest.fn()} />
      </MemoryRouter>,
    );
  });

  afterEach(() => {
    sidebar = null;
  });

  it("should render correctly", () => {
    expect(sidebar.find(Drawer)).toHaveLength(1);
    expect(sidebar.find(Drawer).prop("open")).toBeTruthy();
    expect(sidebar.find(List)).toHaveLength(1);
  });
});
