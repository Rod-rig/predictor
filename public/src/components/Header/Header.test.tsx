import { mount } from "enzyme";
import * as React from "react";
import { MemoryRouter } from "react-router-dom";
import * as renderer from "react-test-renderer";
import { Logo, Sidebar } from "..";
import { Header } from "./";

describe("Header", () => {
  const headerInRouter = (
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
  const header = mount(headerInRouter);

  it("should have logo", () => {
    const logo = header.find(Logo);
    expect(logo).toHaveLength(1);
  });

  it("should open sidebar", () => {
    const menuTrigger = header.find("IconButton");
    menuTrigger.simulate("click");
    expect(header.find(Sidebar).prop("isOpen")).toBeTruthy();
  });

  it("should render correctly", () => {
    const tree = renderer.create(headerInRouter).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
