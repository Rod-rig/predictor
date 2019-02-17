import { mount } from "enzyme";
import * as React from "react";
import { MemoryRouter } from "react-router-dom";
import { Sidebar } from ".";

describe("Sidebar", () => {
  it("should render correctly", () => {
    const toggleMock = jest.fn();
    const sidebar = mount(
      <MemoryRouter>
        <Sidebar isOpen={true} toggleHandler={toggleMock} />
      </MemoryRouter>,
    );
    expect(sidebar.find("Drawer")).toHaveLength(1);
    expect(sidebar.find("Drawer").prop("open")).toBeTruthy();
    expect(sidebar.find("List")).toHaveLength(1);
  });
});
