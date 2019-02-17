import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { mount } from "enzyme";
import * as React from "react";
import { MemoryRouter } from "react-router-dom";
import * as renderer from "react-test-renderer";
import { AccountMenu } from "./AccountMenu";

const logout = jest.fn();

describe("AccountMenu", () => {
  const menu = (
    <MemoryRouter>
      <AccountMenu userName="user" logout={logout} />
    </MemoryRouter>
  );
  const menuWrapper = mount(menu);
  const icon = menuWrapper.find(IconButton);
  icon.simulate("click");

  it("should have icon", () => {
    expect(icon).toHaveLength(1);
  });

  it("should have menu", () => {
    const list = menuWrapper.find(Menu);
    const listItem = menuWrapper.find(MenuItem);
    expect(list).toHaveLength(1);
    expect(listItem).toHaveLength(4);
    expect(listItem.at(0).prop("disabled")).toBeTruthy();
    expect(listItem.at(0).text()).toBe("user");
  });

  it("should close & open menu", () => {
    const menuInst = menuWrapper.find(AccountMenu).instance() as AccountMenu;
    menuInst.closeMenu();
    menuWrapper.update();
    expect(menuWrapper.find(Menu).prop("open")).toBeFalsy();
    icon.simulate("click");
    expect(menuWrapper.find(Menu).prop("open")).toBeTruthy();
  });

  it("should render correctly", () => {
    const tree = renderer.create(menu).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
