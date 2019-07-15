import { IconButton } from "@material-ui/core";
import { mount } from "enzyme";
import * as React from "react";
import { MemoryRouter } from "react-router-dom";
import * as renderer from "react-test-renderer";
import { Logo, Sidebar } from "..";
import { userStore } from "../../stores";
import { Header } from "./";

describe("Header", () => {
  let header: any;
  let headerInRouter: any;

  beforeEach(() => {
    headerInRouter = (
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    header = mount(headerInRouter);
  });

  afterEach(() => {
    headerInRouter = null;
    header = null;
  });

  describe("when user is logged in", () => {
    it("should have logo", () => {
      const logo = header.find(Logo);
      expect(logo).toHaveLength(1);
    });

    it("should open sidebar", () => {
      const menuTrigger = header.find(IconButton).at(0);
      menuTrigger.simulate("click");
      expect(header.find(Sidebar).prop("isOpen")).toBeTruthy();
    });

    it("should render correctly", () => {
      const tree = renderer.create(headerInRouter).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe("when user is not logged in", () => {
    beforeEach(() => {
      userStore.isLoggedIn = false;
    });

    it("should render snapshot correctly", () => {
      const tree = renderer.create(headerInRouter).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
